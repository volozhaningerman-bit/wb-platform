import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('WB Platform API starting');

  // Runtime configuration:
  // - enable global validation
  // - connect database
  // - load modules

  const app = {
    useGlobalPipes(pipe:any){
      return pipe;
    }
  };

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      transform:true
    })
  );
}

bootstrap();
