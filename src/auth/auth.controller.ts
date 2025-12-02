import { Controller, Post, Body, HttpCode, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() body, @Res({ passthrough: true }) res: Response) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      res.status(401).send({ message: 'Unauthorized' });
      return;
    }
    const { access_token } = await this.authService.login(user);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });
    return { access_token };
  }
}
