import { IsString, IsMobilePhone } from 'class-validator';

export class SMSCodeRequest {
    @IsMobilePhone('zh-CN')
    mobilePhoneNumber: string;
}

export class SignInPhoneRequest extends SMSCodeRequest {
    @IsString()
    verificationCode: string;
}

export class SignInOAuthRequest {
    @IsString()
    code: string;
}

export class SignInResponse {
    @IsString()
    token: string;
}
