import { IsArray, IsBoolean, IsString } from 'class-validator';

export class UserDTO {
	@IsString() //class-validator check -------------------
	role: 'admin' | 'user' | 'staff' | 'superadmin';

	@IsString()
	subrole: string;

	@IsString()
	firstName: string;

	@IsString()
	secondName: string;

	@IsString()
	lastName: string;

	@IsString()
	userPic: string;

	@IsString()
	phoneNumber: string;

	@IsString()
	email: string;

	@IsString()
	password: string;

	@IsString()
	secret: string;

	@IsString()
	innNumber: string;

	@IsString()
	companyId: string;

	@IsArray()
	friendsIds: string;

	@IsArray()
	friendsRequestsIds: string;

	@IsBoolean()
	isActive: boolean;
}