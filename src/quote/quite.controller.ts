import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { QuoteDTO } from './quote.dto';
import { QuoteService } from './quote.service';

@Controller('api/quote')
export class QuoteController {
	constructor(private quoteService: QuoteService) {}

	@Post()
	add(@Body() data: Partial<QuoteDTO>) {
		return this.quoteService.add(data);
	}

	@Get()
	getAll() {
		return this.quoteService.getAll();
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() data: Partial<QuoteDTO>) {
		return this.quoteService.update(id, data);
	}

	@Delete(':id')
	deleteOne(@Param('id') id: string) {
		console.log('controller id: ', id);
		return this.quoteService.destroy(id);
	}
}
