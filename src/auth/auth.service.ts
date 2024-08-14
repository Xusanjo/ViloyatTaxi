import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "src/user/repository/user.repository";
import { SignUpUserDto, SignInUserDto, OtpVerifyDto } from "src/common/dto";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ){}

    signUp(createUserDto: SignUpUserDto){
        return this.userService.create(createUserDto);
    }

    async otpVerify(otpVerifyDto: OtpVerifyDto){
        try {
            const { email, otp } = otpVerifyDto;

            const existUser = await this.userRepository.findByIdEmail(email);
            if( !existUser ){
                return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
            }

            const existOtp = await this.userRepository.findOneOtp(existUser.id);
            if(existOtp.otp !== otp){
                return new HttpException('Invalid One Time Password', HttpStatus.BAD_REQUEST);
            }

            await this.userRepository.deleteOtp(existOtp.id);

            return {
                message: 'Otp verify',
                statusCode: 200,
            };
        } catch (error) {
            console.log(error);
            return new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async signIn(signInUserDto: SignInUserDto){
        try {
            const { email, password } = signInUserDto;
            const existUser = await this.userRepository.findByIdEmail(email);
            
            if(!existUser){
                return new HttpException('Invalid Email', HttpStatus.BAD_REQUEST);
            }

            if(existUser.isActive){
                return new HttpException('You are inactive', HttpStatus.BAD_REQUEST);
            }

            const checkPassword = await bcrypt.compare(password, existUser.password);
            if(!checkPassword){
                return new HttpException('Invaled Password', HttpStatus.BAD_REQUEST);
            }

            const accessTime = this.configService.get<string>('jwt.accessTime');
            const refreshTime = this.configService.get<string>('jwt.refreshTime');

            const accessToken = this.generateToken(
                {
                    id: existUser.id,
                    email,
                    name: existUser.name,
                    role: existUser.role,
                },
                { expiresIn: accessTime },
            );

            const refreshToken = this.generateToken(
                {
                    id: existUser.id,
                    email,
                    name: existUser.name,
                    role: existUser.role,
                },
                { expiresIn: refreshTime },
            );

            const refresh = await this.userRepository.createAndUpdateToken({
                refresh: refreshToken,
                userId: existUser.id,
            });
            if(!refresh) {
                return new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return {accessToken, refreshToken}
        } catch (error) {
            console.log(error);
            return new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    generateToken(
        payload: {id: number, email: string, name: string, role: string},
        expire: { expiresIn: string },
    ){
        return this.jwtService.sign(payload, expire);
    }

    async refreshToken(token: {refresh: string}){
        try {
            if(!token?.refresh || typeof token.refresh !== 'string'){
                return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
            }

            const decodedUser = this.jwtService.verify(token.refresh);
            const existRefresh = await this.userRepository.findOneToken(token.refresh);
            if(!existRefresh){
                return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
            }

            const accessTime = this.configService.get<string>('jwt.accessTime');
            const refreshTime = this.configService.get<string>('jwt.refreshTime');

            const accessToken = this.generateToken(
                {
                    id: decodedUser.id,
                    email: decodedUser.email,
                    name: decodedUser.name,
                    role: decodedUser.role,
                },
                { expiresIn: accessTime },
            );

            const refreshToken = this.generateToken(
                {
                    id: decodedUser.id,
                    email: decodedUser.email,
                    name: decodedUser.name,
                    role: decodedUser.role,
                },
                { expiresIn: refreshTime },
            );

            const refresh = await this.userRepository.createAndUpdateToken({
                refresh: refreshToken,
                userId: decodedUser.id,
            });

            if(!refresh){
                return new HttpException(
                    'Internal Server Error',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }

            return { accessToken, refreshToken };
        } catch (error) {
            console.log(error);
            if(error.name === 'TokenExpiredError'){
                return new HttpException('Token has expired', HttpStatus.UNAUTHORIZED);
            }else if(error.name === 'JsonWebTokenError'){
                return new HttpException('Invaled token', HttpStatus.UNAUTHORIZED);
            }

            return new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getMe(request: any){
        try {
            const user = request.user;
            if(!user){
                return new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }
            
            const existUser = await this.userRepository.findByIdEmail(user.email);
            if(!existUser){
                return new HttpException('User not found', HttpStatus.NOT_FOUND);
            }

            const { password, ...safeUser } = existUser;
            return safeUser;
        } catch (error) {
            console.log(error);
            return new HttpException('Inernal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async logout(request: any){
        try {
            const user = request.user;
            if(!user){
                return new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }

            await this.userRepository.deleteToken(user.id);
            return {
                accessToken: 'logout',
                refreshToken: 'logout',
            };
        } catch (error) {
            console.log(error);
            return new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}