import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() data: CreateAuthDto) {
    return await this.authService.create(data);
  }

  @Post('session')
  async login(@Body() data: User) {
    return await this.authService.login(data);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@Req() req) {
    return { me: 'ok', payLoad: req.tokenPayload };
    // , data: req.user
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.authService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Post('forget')
  async forget(@Body() data) {
    return this.authService.forget(data.email);
  }
}
