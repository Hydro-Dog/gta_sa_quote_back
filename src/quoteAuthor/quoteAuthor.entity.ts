import { QuoteEntity } from 'src/quote/quote.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('quoteAuthor')
export class QuoteAuthorEntity {
	@PrimaryColumn() id: string;
	@CreateDateColumn() created: Date;
	@UpdateDateColumn() updated: Date;
	@Column('text') name: string;
	@Column('text') userPic: string;
	@OneToMany(
		() => QuoteEntity,
		quote => quote.id,
	)
	quotes: QuoteEntity[];
}
