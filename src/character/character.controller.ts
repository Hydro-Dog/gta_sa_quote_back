import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { CharacterDTO } from './character.dto';
import { CharacterService } from './character.service';

@Controller('api/character')
export class CharacterController {
	constructor(private characterService: CharacterService) {}

	@Post()
	add(@Body() data: CharacterDTO) {
		return this.characterService.add(data);
	}

	@Get()
	getAll() {
		console.log('characters get');
		return this.characterService.getAll();
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() data: Partial<CharacterDTO>) {
		return this.characterService.update(id, data);
	}

	@Delete(':id')
	deleteOne(@Param('id') id: string) {
		console.log('controller 2 id: ', id);
		return this.characterService.destroy(id);
	}
}
