import { IsString } from 'class-validator';

export class QuoteDTO {
	@IsString() text: string;
	@IsString() author?: any;
	@IsString() authorId?: any;
}
