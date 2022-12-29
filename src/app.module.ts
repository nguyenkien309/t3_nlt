import { UploadFileModule } from './modules/upload-file/upload-file.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    OrderModule,
    ProductModule,
    AuthModule,
    UploadFileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
