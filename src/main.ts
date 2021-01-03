import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import bodyParser, { json, urlencoded } from 'body-parser';

declare const module: any;
// const port = process.env.PORT;
const port = 5000;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.use(json({ limit: '50mb' }));
	app.use(urlencoded({ extended: true, limit: '50mb' }));

	await app.listen(5000);
	Logger.log(`Server is running on port ${port}`, 'Bootstrap');
}
bootstrap();
