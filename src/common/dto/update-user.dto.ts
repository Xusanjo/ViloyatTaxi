import { PartialType } from '@nestjs/mapped-types';
import { SignUpUserDto } from './signUp.dto';

export class UpdateUserDto extends PartialType(SignUpUserDto) {}
