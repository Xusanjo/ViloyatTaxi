import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsBoolean, IsNumber } from "class-validator";

export class UpdateDriverDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    firstName?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    lastName?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    phone?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    address?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    photo?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    driversLicence?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    token?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    password?: string;
  
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    totalBalance?: number;
  }