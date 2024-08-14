import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto, SignUpUserDto, OtpVerifyDto, RefreshDto} from "../common/dto";
import { AuthGuard, RolesGuard, Role, Roles } from 'src/common/guards';
import { ApiBearerAuth, ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ){}

  @ApiProperty({ type: SignUpUserDto })
  @Post('signup')
  signUp(@Body() createUserDto: SignUpUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @ApiProperty({type: OtpVerifyDto})
  @Post('otpVerify')
  otpVerify(@Body() otpVerifyDto: OtpVerifyDto){
    return this.authService.otpVerify(otpVerifyDto);
  }

  @ApiProperty({type: SignInUserDto})
  @Post('signin')
  async signIn(@Body() refreshToken: RefreshDto){
    return await this.authService.refreshToken(refreshToken);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get('getMe')
  async getMe(@Req() request: Request){
    return await this.authService.getMe(request);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get('logout')
  async logout(@Req() request: Request){
    return await this.authService.logout(request);
  }
}
