import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DriverModule } from './driver/driver.module';
import { CarModule } from './car/car.module';
import { OrderTaxiModule } from './order_taxi/order_taxi.module';
import { AuthModule } from './auth/auth.module';
import { NestConfigModule } from './config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    NestConfigModule,
    JwtModule.registerAsync({
      imports: [NestConfigModule],
      inject: [ConfigService],
      useFactory:(configService: ConfigService) => ({
        secret: configService.get<string>('jwt.tokenSecret'),
      }),
      global: true,
    }),
    MailerModule.forRootAsync({
      imports: [NestConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport:{
          host: configService.get<string>('mail.MAIL_HOST'),
          port: Number(configService.get<string>('mail.MAIL_PORT')),
          secure: false,
          auth: {
            user: configService.get<string>('mail.MAIL_USER'),
            pass: configService.get<string>('mail.MAIL_PASS'),
          },
        },
      }),
    }),
    UserModule, 
    DriverModule, 
    CarModule, 
    OrderTaxiModule, 
    AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
