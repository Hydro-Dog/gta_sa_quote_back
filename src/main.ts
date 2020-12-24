import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

declare const module: any;
// const port = process.env.PORT;
const port = 5000;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(5000);
	Logger.log(`Server is running on port ${port}`, 'Bootstrap');
}
bootstrap();
