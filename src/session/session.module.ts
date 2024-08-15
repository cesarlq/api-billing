import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionInfoSchema, SessionDatas } from './schema/session.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SessionDatas.name,
        schema: SessionInfoSchema,
      },
    ]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
