import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length} from "class-validator";

export class OtpVerifyDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(4,20)
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(4,8)
    otp: string;
}

export class RefreshDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    refresh: string
}