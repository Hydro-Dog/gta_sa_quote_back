import { QuoteAuthorEntity } from 'src/quoteAuthor/quoteAuthor.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('quote')
export class QuoteEntity {
	@PrimaryGeneratedColumn() id: string;
	@CreateDateColumn() created: Date;
	@UpdateDateColumn() updated: Date;
	@Column('text') text: string;
	@ManyToOne(
		() => QuoteAuthorEntity,
		author => author.quotes,
	)
	author: QuoteAuthorEntity;
}
