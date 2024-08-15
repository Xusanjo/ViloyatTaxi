import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiProperty, ApiTags } from "@nestjs/swagger";
import { SignUpUserDto, UpdateUserDto  } from '../common/dto/index';
import { AuthGuard, RolesGuard, Role, Roles} from "src/common/guards/index";
import { User } from '@prisma/client';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  // @Roles(Role.ADMIN)
  // @ApiBearerAuth()
  @ApiProperty({ type: SignUpUserDto })
  @Post('create')
  create(@Body() createUserDto: User) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.ADMIN)
  @Get('getAll')
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER) 
  @ApiProperty({ type: UpdateUserDto })
  @Patch(':id')
  update(
    @Param('id') id: number, 
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: Request,
    ) {
    return this.userService.update(id, updateUserDto, request);
  }

  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
