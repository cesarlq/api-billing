import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async create(@Body() createSessionDto: CreateSessionDto) {
    const hashedPassword = await bcrypt.hash(createSessionDto.password, 12);
    const user = await this.sessionService.create({
      user: createSessionDto.user,
      password: hashedPassword,
      name: createSessionDto.name,
      address: {
        street: createSessionDto.address.street,
        city: createSessionDto.address.city,
        state: createSessionDto.address.state,
        zip: createSessionDto.address.zip,
        suburb: createSessionDto.address.suburb,
      },
    });

    delete user.data;

    return user;
  }

  @Post('login')
  async login(
    @Body() createSessionDto: CreateSessionDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.sessionService.findOneByUser(createSessionDto.user);
    if (!user) {
      throw new BadRequestException('Invalid credentias');
    }
    if (!(await bcrypt.compare(createSessionDto.password, user.password))) {
      throw new BadRequestException('Invalid credentias, pass');
    }
    delete user.password;
    const jwt = await this.jwtService.signAsync({ user });
    response.cookie('jwt', jwt, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    response.cookie('User', jwt, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
    });
    return {
      message: 'success Login',
    };
  }

  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException('Invalid credentias data');
      }

      const user = await this.sessionService.findOne(data.user._id);
      const userObj = user.toObject();
      const { password, ...result } = userObj;
      return result;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentias');
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    response.clearCookie('User');
    return {
      message: 'success logout',
      response: response,
    };
  }

  @Get()
  findAll() {
    return this.sessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionService.update(+id, updateSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionService.remove(+id);
  }
}
