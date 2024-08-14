import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    Length
} from "class-validator";

export class SignUpUserDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(4,20)
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string
}