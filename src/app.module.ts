import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { StatusModule } from './status/status.module';
import { DescribeModule } from './describe/describe.module';


@Module({
  imports: [
        AuthModule, 
        AuthModule, UserModule, StatusModule, DescribeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
