import {
	Injectable,
	CanActivate,
	ExecutionContext,
	Inject,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		@Inject('UserService') private readonly userService: UserService,
	) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		if (!request.headers.authorization) {
			return false;
		}

		return await this.validateRequest(request.headers.authorization);
	}

	async validateRequest(authorization: string) {
		const authToken = authorization;

		const id = jwt.decode(authToken)['id'];
		const user = await this.userService.get(id);

		if (jwt.verify(authToken, user.secret)) {
			return true;
		} else {
			throw new HttpException('Authorization failed', HttpStatus.UNAUTHORIZED);
		}
	}
}
