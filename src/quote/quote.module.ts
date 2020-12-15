import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteController } from './quite.controller';
import { QuoteEntity } from './quote.entity';
import { QuoteService } from './quote.service';

@Module({
	imports: [TypeOrmModule.forFeature([QuoteEntity])],
	controllers: [QuoteController],
	providers: [QuoteService],
	exports: [TypeOrmModule.forFeature([QuoteEntity])],
})
export class QuoteModule {}
