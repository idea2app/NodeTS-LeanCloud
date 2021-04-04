import { Type } from 'class-transformer';
import {
    IsOptional,
    IsPositive,
    IsString,
    IsArray,
    IsMobilePhone,
    IsEmail,
    IsUrl,
    ValidateNested
} from 'class-validator';

import { BaseModel } from './Base';

export enum UserRole {
    Admin = 'Admin'
}

export type UserRoleName = keyof typeof UserRole;

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
    roles?: UserRoleName[];

    @IsOptional()
    @IsUrl()
    avatar?: string;
}

export class UserList {
    @IsPositive()
    count: number;

    @ValidateNested({ each: true })
    @Type(() => UserModel)
    data: UserModel[];
}

export interface JWTData {
    token: string;
    roles?: UserRoleName[];
}
