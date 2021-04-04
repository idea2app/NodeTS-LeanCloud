import {
    JsonController,
    Authorized,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    CurrentUser,
    ForbiddenError,
    OnUndefined
} from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { sign } from 'jsonwebtoken';
import { User } from 'leanengine';
import { Cloud } from 'leancloud-storage';

import {
    SMSCodeRequest,
    SignInPhoneRequest,
    SignInOAuthRequest,
    SignInResponse,
    UserRole,
    UserModel
} from '../model';
import { getWechatSession } from '../utility';

const { ROOT_ACCOUNT, LEANCLOUD_APP_KEY } = process.env;

@JsonController('/session')
export class SessionController {
    static signToken(user: User) {
        return sign(
            { token: user.getSessionToken(), roles: user.get('roles') },
            LEANCLOUD_APP_KEY,
            { expiresIn: '7d' }
        );
    }

    @Post('/smsCode')
    sendSMSCode(@Body() { mobilePhoneNumber: phone }: SMSCodeRequest) {
        return Cloud.requestSmsCode(phone);
    }

    @Post()
    @ResponseSchema(SignInResponse)
    async signInWithPhone(
        @Body()
        { mobilePhoneNumber: phone, verificationCode: code }: SignInPhoneRequest
    ) {
        const user = await User.signUpOrlogInWithMobilePhone(phone, code);

        if (!user.get('roles') && phone === ROOT_ACCOUNT)
            await user.save({ roles: [UserRole.Admin] }, { user });

        return { token: SessionController.signToken(user) } as SignInResponse;
    }

    @Post()
    @ResponseSchema(SignInResponse)
    async signInWithWechat(@Body() { code }: SignInOAuthRequest) {
        const { unionid, session_key, ...data } = await getWechatSession(code);

        const user = await (unionid
            ? User.loginWithWeappWithUnionId(unionid)
            : User.loginWithAuthData(
                  { access_token: session_key, ...data },
                  'weixin'
              ));
        return { token: SessionController.signToken(user) } as SignInResponse;
    }

    @Get()
    @Authorized()
    @ResponseSchema(UserModel)
    async getProfile(@CurrentUser() user: User) {
        return (await user.fetch()).toJSON() as UserModel;
    }

    @Patch()
    @Authorized()
    @ResponseSchema(UserModel)
    async editProfile(
        @CurrentUser() user: User,
        @Body() { roles, ...data }: UserModel
    ) {
        if (roles) throw new ForbiddenError();

        return (
            await user.save(data, { user, fetchWhenSave: true })
        ).toJSON() as UserModel;
    }

    @Delete()
    @Authorized()
    @OnUndefined(204)
    async destroy() {
        await User.logOut();
    }
}
