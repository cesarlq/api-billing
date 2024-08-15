import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SessionDocument, SessionDatas } from './schema/session.schema';
import { Model } from 'mongoose';

@Injectable()
export class SessionService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @InjectModel(SessionDatas.name)
    private SessionModule: Model<SessionDocument>,
  ) {}

  async create(createSessionDto: CreateSessionDto) {
    const createSession = await this.SessionModule.create(createSessionDto);
    const response = {
      message: 'User created successfully',
      data: createSession,
    };
    return response;
  }

  findAll() {
    const allSesion = this.SessionModule.find();
    return allSesion;
  }

  findOneByUser(user: string) {
    const findBilling = this.SessionModule.findOne({ user });
    return findBilling;
  }

  findOne(id: string) {
    const findBilling = this.SessionModule.findById(id);
    return findBilling;
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
