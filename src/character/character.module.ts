import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CharacterEntity } from './character.entity';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';

@Module({
	imports: [TypeOrmModule.forFeature([CharacterEntity])],
	controllers: [CharacterController],
	providers: [CharacterService],
	exports: [TypeOrmModule.forFeature([CharacterEntity])],
})
export class CharacterModule {}
