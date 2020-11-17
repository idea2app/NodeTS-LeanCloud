import {
    IsOptional,
    IsPositive,
    IsString,
    IsArray,
    IsEmail,
    IsMobilePhone
} from 'class-validator';

import { BaseModel } from './Base';

export class SMSCodeRequest {
    @IsMobilePhone('zh-CN')
    mobilePhoneNumber: string;
}

export class SignInRequest extends SMSCodeRequest {
    @IsString()
    verificationCode: string;
}

export class SignInResponse {
    @IsString()
    token: string;
}

export class UserModel extends BaseModel {
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsMobilePhone('zh-CN')
    mobilePhoneNumber?: string;

    @IsOptional()
    @IsArray()
    roles?: string[];
}

export class UserList {
    @IsPositive()
    count: number;

    @IsArray()
    data: UserModel[];
}

export enum UserRole {
    Admin = 'Admin'
}

export interface JWTData {
    token: string;
    roles?: (keyof typeof UserRole)[];
}
