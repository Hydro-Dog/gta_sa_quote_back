import { QuoteEntity } from 'src/quote/quote.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('character')
export class CharacterEntity {
	@PrimaryGeneratedColumn() id: string;
	@CreateDateColumn() created: Date;
	@UpdateDateColumn() updated: Date;
	@Column('text') name: string;
	@Column('text') image: string;
	@OneToMany(
		() => QuoteEntity,
		quote => quote.id,
	)
	quotes: QuoteEntity[];
}
