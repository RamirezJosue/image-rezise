import { Controller, Get } from '@nestjs/common';
import { SharpService } from 'nestjs-sharp';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private sharpService: SharpService,
  ) {}

  @Get()
  async getHello():Promise<any> {
    console.log('hola probandoooo');
    const image = await this.sharpService.edit('public/prueba.jpg')
            .withMetadata() // I'm guessing set the metadata before compression?
            .png({
              quality: 95, // play around with this number until you get the file size you want
              compression: 6, // this doesn't need to be set, it is by default, no need to increase compression, it will take longer to process
            })
            .toFile('public/hola.png');
        // .resize(320, 240, {
        //   kernel: 'nearest',
        //   fit: 'cover',
        //   position: 'entropy',
        //   background: { r: 255, g: 0, b: 0, alpha: 0.5 }
        // }).toFile('public/hola.webp');
    console.log(image);
    return this.appService.getHello();
  }
}
