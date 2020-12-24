import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { QuoteController } from './quite.controller';
import { QuoteEntity } from './quote.entity';
import { QuoteService } from './quote.service';

@Module({
	imports: [TypeOrmModule.forFeature([QuoteEntity, UserEntity])],
	controllers: [QuoteController],
	providers: [QuoteService, UserService],
	exports: [TypeOrmModule.forFeature([QuoteEntity])],
})
export class QuoteModule {}
