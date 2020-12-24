import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { QuoteAuthorEntity } from './quoteAuthor.entity';

@Module({
	imports: [TypeOrmModule.forFeature([QuoteAuthorEntity])],
	exports: [TypeOrmModule.forFeature([QuoteAuthorEntity])],
})
export class QuoteAuthorModule {}
