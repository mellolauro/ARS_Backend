import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StatusModule } from './status/status.module';
import { DescribeModule } from './describe/describe.module';
import { PrismaService } from './prisma.service';

@Module({
    imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    StatusModule,
    DescribeModule,
    AuthModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
