import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryProvider } from './cloudinary';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryProvider]
})
export class CloudinaryModule {}
