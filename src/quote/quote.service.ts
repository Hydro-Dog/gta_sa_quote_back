import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/user/user.dto';
import { Repository } from 'typeorm';
import { QuoteDTO } from './quote.dto';
import { QuoteEntity } from './quote.entity';

@Injectable()
export class QuoteService {
	constructor(
		@InjectRepository(QuoteEntity)
		private quoteRepository: Repository<QuoteEntity>,
	) {}

	async add(data: Partial<QuoteDTO>): Promise<Partial<QuoteDTO>> {
		const { text, author } = data;
		let quote = await this.quoteRepository.findOne({ where: { text } });
		if (quote) {
			throw new HttpException('Quote already exist', HttpStatus.BAD_REQUEST);
		}

		quote = await this.quoteRepository.create(data);
		await this.quoteRepository.save(quote);
		return quote;
	}

	async getAll(): Promise<Partial<QuoteDTO[]>> {
		const quotes = await this.quoteRepository.find({ relations: ['author'] });
		return quotes;
	}

	async getRandom(): Promise<QuoteDTO> {
		const quotes = await this.quoteRepository.find({ relations: ['author'] });
		return quotes[Math.round(Math.random() * quotes.length)];
	}

	async update(
		id: string,
		data: Partial<QuoteDTO>,
	): Promise<Partial<QuoteDTO>> {
		const quote = await this.quoteRepository.update({ id }, data);
		if (!quote.affected) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}
		return this.quoteRepository.findOne({ where: { id } });
	}

	async destroy(id: string): Promise<any> {
		const quote = await this.quoteRepository.delete({ id });
		console.log('quote: ', quote);
		if (!quote.affected) {
			throw new HttpException('Not found', HttpStatus.NOT_FOUND);
		}
		return { quote: id };
	}
}
