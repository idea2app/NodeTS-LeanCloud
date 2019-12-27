import {
    JsonController,
    Get,
    Ctx,
    QueryParam,
    UnauthorizedError,
    ForbiddenError,
    Param,
    Post,
    OnUndefined,
    Delete
} from 'routing-controllers';
import { User, Query, Object as LCObject, Role } from 'leanengine';

import { LCContext } from '../utility';
import { RoleController } from './Role';

@JsonController('/user')
export class UserController {
    @Get()
    async getList(
        @Ctx() { currentUser }: LCContext,
        @QueryParam('pageSize') pageSize = 10,
        @QueryParam('pageIndex') pageIndex = 1
    ) {
        if (!currentUser) throw new UnauthorizedError();

        if (!(await RoleController.isAdmin(currentUser)))
            throw new ForbiddenError();

        const list = await new Query(User)
            .limit(pageSize)
            .skip(pageSize * --pageIndex)
            .find({ useMasterKey: true });

        return list.map(item => item.toJSON());
    }

    @Get('/:id')
    async getOne(@Param('id') id: string) {
        const user = await new Query(User).get(id);

        const roles = (await user.getRoles()).map(item => item.toJSON());

        return { ...user.toJSON(), roles };
    }

    @Post('/:id/role/:rid')
    @OnUndefined(201)
    async addRole(
        @Ctx() { currentUser }: LCContext,
        @Param('id') id: string,
        @Param('rid') rid: string
    ) {
        const role = await new Query(Role).get(rid);

        role.getUsers().add(LCObject.createWithoutData('_User', id));

        await role.save(null, { user: currentUser });
    }

    @Delete('/:id/role/:rid')
    @OnUndefined(204)
    async removeRole(
        @Ctx() { currentUser }: LCContext,
        @Param('id') id: string,
        @Param('rid') rid: string
    ) {
        const role = await new Query(Role).get(rid);

        role.getUsers().remove(LCObject.createWithoutData('_User', id));

        await role.save(null, { user: currentUser });
    }
}
