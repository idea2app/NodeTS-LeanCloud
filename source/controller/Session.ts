import { User } from 'leanengine';
import { Cloud } from 'leancloud-storage';
import {
    JsonController,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Ctx,
    UnauthorizedError
} from 'routing-controllers';

import { LCContext } from '../utility';
import { UserRole, UserModel } from '../model';
import { RoleController } from './Role';

interface SignInToken {
    phone: string;
    code?: string;
}

const { ROOT_ACCOUNT } = process.env;

@JsonController('/session')
export class SessionController {
    @Post('/smsCode')
    sendSMSCode(@Body() { phone }: SignInToken) {
        return Cloud.requestSmsCode(phone);
    }

    @Post('/')
    async signIn(
        @Body() { phone, code }: SignInToken,
        @Ctx() context: LCContext
    ) {
        const user = await User.signUpOrlogInWithMobilePhone(phone, code);

        context.saveCurrentUser(user);

        if (phone === ROOT_ACCOUNT && !(await RoleController.isAdmin(user)))
            await RoleController.create(UserRole.Admin, user);

        return user.toJSON();
    }

    @Get('/')
    getProfile(@Ctx() { currentUser }: LCContext) {
        if (!currentUser) throw new UnauthorizedError();

        return currentUser.toJSON();
    }

    @Patch('/')
    async editProfile(
        @Ctx() { currentUser }: LCContext,
        @Body() body: UserModel
    ) {
        if (!currentUser) throw new UnauthorizedError();

        await currentUser.save(body, { user: currentUser });

        return currentUser.toJSON();
    }

    @Delete('/')
    destroy(@Ctx() context: LCContext) {
        if (!context.currentUser) throw new UnauthorizedError();

        context.currentUser.logOut();
        context.clearCurrentUser();

        return '';
    }
}
