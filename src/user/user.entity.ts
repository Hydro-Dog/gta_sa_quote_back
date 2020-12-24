import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { userRole } from 'src/shared/types/userRole.type';

//pass name to the @Entity() decorator to specify db table name --------------------------
@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn() id: string;
	@CreateDateColumn() created: Date;
	@UpdateDateColumn() updated: Date;
	@Column({ type: 'text', nullable: true }) role: userRole;
	@Column({ type: 'text', nullable: true }) firstName: string;
	@Column({ type: 'text', nullable: true }) secondName: string;
	@Column({ type: 'text', nullable: true }) lastName: string;
	@Column({ type: 'text', nullable: true }) userPic: string;
	@Column({ type: 'text', nullable: true }) phoneNumber: string;
	@Column({ type: 'text', unique: true }) email: string;
	@Column({ type: 'text' }) password: string;
	@Column({ type: 'text', nullable: true }) secret: string;
	@Column({ type: 'text', nullable: true }) lang: string;
	@Column({ type: 'text', nullable: true }) companyId: string;
	@Column({ type: 'text', nullable: true }) friendsIds: string[];
	@Column({ type: 'text', nullable: true }) friendsRequestsIds: string[];
	@Column({ type: 'text', nullable: true }) isActive: boolean;

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}

	toResponseObject(addToken = false, secret = '') {
		const resObj: any = { ...this };
		delete resObj.password;
		if (addToken && secret) {
			resObj.authToken = this.getAuthToken(secret);
			resObj.refreshToken = this.getRefreshToken(secret);
		}
		return resObj;
	}

	async comparePassword(attempt: string) {
		return await bcrypt.compare(attempt, this.password);
	}

	private getAuthToken(secret) {
		const { id } = this;
		return jwt.sign({ id }, secret, { expiresIn: '5m' });
	}

	private getRefreshToken(secret) {
		const { id } = this;
		return jwt.sign({ id }, secret, { expiresIn: '10m' });
	}
}
