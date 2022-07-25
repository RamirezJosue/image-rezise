import { Controller, Post,UploadedFile, UseInterceptors, BadRequestException, Get, Param, Res, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('file/uploads/:name')
  findOneImage(
    @Res() res: Response,
    @Param('name') name: string
  ) {
 
    const path = this.filesService.getStaticImage(name);
    res.sendFile(path)
    // return path;
  }

  @Post('file/upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    // limits: { fileSize: 100000}
    storage: diskStorage({
      destination: './static/uploads',
      filename: fileNamer
    })
  }))
  uploadImage( 
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }
    const url = `http://localhost:3000/file/uploads/${file.filename}`;
    return {url};
  }

  @Post('files/upload')
  @UseInterceptors(
    FilesInterceptor('files[]', 20, {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/otros',
        filename: fileNamer
      })
    })
  )
  logFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    if (!files) {
      throw new BadRequestException('Make sure that the file is an image');
    }

    const urls = files.map(file => (`http://localhost:3000/file/uploads/${file.filename}`));
    return urls;
  }
}
