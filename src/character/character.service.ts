import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacterDTO } from './character.dto';
import { CharacterEntity } from './character.entity';

@Injectable()
export class CharacterService {
	constructor(
		@InjectRepository(CharacterEntity)
		private characterRepository: Repository<CharacterEntity>,
	) {}

	async add(data: CharacterDTO): Promise<Partial<CharacterDTO>> {
		const { name } = data;
		let character = await this.characterRepository.findOne({ where: { name } });
		if (character) {
			throw new HttpException(
				'Character already exist',
				HttpStatus.BAD_REQUEST,
			);
		}

		character = await this.characterRepository.create(data);
		await this.characterRepository.save(character);
		return character;
	}

	async getAll(): Promise<Partial<CharacterDTO[]>> {
		const characters = await this.characterRepository.find();
		return characters;
	}

	async update(
		id: string,
		data: Partial<CharacterDTO>,
	): Promise<Partial<CharacterDTO>> {
		const characters = await this.characterRepository.update({ id }, data);
		if (!characters.affected) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}
		return this.characterRepository.findOne({ where: { id } });
	}

	async destroy(id: string): Promise<any> {
		console.log('id: ', id);
		const character = await this.characterRepository.delete({ id });
		if (!character.affected) {
			throw new HttpException('Not found', HttpStatus.NOT_FOUND);
		}
		return { character: id };
	}
}
