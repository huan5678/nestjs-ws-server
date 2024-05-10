import {
  Controller,
  Get,
  Patch,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileInterceptor,
  FilesInterceptor,
  type File,
} from '@nest-lab/fastify-multer';
// import { AppService } from './app.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('/')
export class AppController {
  // constructor(private readonly appService: AppService) {}
  @Get('/')
  @ApiOperation({ summary: 'Hello World' })
  getHello(): string {
    return 'Hello World!';
  }

  @Patch('/file')
  @ApiOperation({ summary: 'Uploads a single file' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  singleFile(@UploadedFile() file: File) {
    return console.log(file);
  }

  @Patch('/files')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Uploads multiple files' })
  @UseInterceptors(FilesInterceptor('files', 4))
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  multipleFiles(@UploadedFiles() files: Array<File>) {
    return console.log(files);
  }
}
