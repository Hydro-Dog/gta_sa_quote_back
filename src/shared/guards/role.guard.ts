import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import * as jwt from 'jsonwebtoken';
import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
7;

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(
		@Inject('UserService') private readonly userService: UserService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const authToken = request.headers.authorization;
		const id = await jwt.decode(authToken)['id'];
		const user = await this.userService.get(id);
		if (user.role === 'admin') {
			return true;
		}

		throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
	}
}
