import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Viloyat Taxi API')
    .setDescription('The Viloyat Taxi API description')
    .setVersion('1.0')
    .addTag('viloyat taxi')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(1999, () => {
    console.log(`Servis is running on port ${1999}`);
  });
}
bootstrap();
