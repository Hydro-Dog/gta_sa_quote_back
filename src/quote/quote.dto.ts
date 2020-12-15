import { IsString } from 'class-validator';

export class QuoteDTO {
	@IsString() text: string;
	@IsString() author: string;
	@IsString() authorPic: string;
}
