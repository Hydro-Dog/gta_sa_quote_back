import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http.error.filter';
import { LoggerInterseptor } from './shared/logging.interseptor';
import { AuthModule } from './auth/auth.module';
import { QuoteModule } from './quote/quote.module';
import { CharacterModule } from './character/character.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(), // insert typeorm module to the app
		UserModule,
		AuthModule,
		QuoteModule,
		CharacterModule,
	],
	controllers: [AppController],
	providers: [AppService, { provide: APP_FILTER, useClass: HttpErrorFilter }],
})
export class AppModule {}
