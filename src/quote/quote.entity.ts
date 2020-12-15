import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('quote')
export class QuoteEntity {
	@PrimaryGeneratedColumn() id: string;
	@CreateDateColumn() created: Date;
	@UpdateDateColumn() updated: Date;
	@Column('text') text: string;
	@Column('text') author: string;
	@Column('text') authorPic: string;
}
