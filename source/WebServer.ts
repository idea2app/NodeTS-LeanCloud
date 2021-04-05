import 'reflect-metadata';
import Koa, { Context } from 'koa';
import Logger from 'koa-logger';
import JWT from 'koa-jwt';
import { useKoaServer } from 'routing-controllers';
import { init, koa2, User } from 'leanengine';
import { createAPI } from 'koagger';

import { UserRole, JWTData } from './model';
import controllers from './controller';

const {
    LEANCLOUD_APP_ID: appId,
    LEANCLOUD_APP_KEY: appKey,
    LEANCLOUD_APP_MASTER_KEY: masterKey
} = process.env;

const { swagger, router } = createAPI({ controllers });

init({ appId, appKey, masterKey });

const app = new Koa()
    .use(Logger())
    .use(koa2())
    .use(swagger())
    .use(JWT({ secret: appKey, passthrough: true }));

useKoaServer(app, {
    cors: { credentials: true },
    authorizationChecker: (
        { context: { state } }: { context?: Context },
        required_roles: (keyof typeof UserRole)[]
    ) => {
        if (!state.user) return false;

        const { roles } = state.user as JWTData;

        return required_roles[0]
            ? roles?.some(role => required_roles.includes(role))
            : true;
    },
    currentUserChecker: ({ context: { state } }: { context?: Context }) =>
        User.become((state.user as JWTData).token),
    ...router
});

export default app;
