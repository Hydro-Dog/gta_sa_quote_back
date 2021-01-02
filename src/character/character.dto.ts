import { IsString } from 'class-validator';

export class CharacterDTO {
	@IsString() name: string;
	@IsString() image: any;
}
