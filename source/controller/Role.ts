import {
    JsonController,
    Post,
    Ctx,
    Body,
    UnauthorizedError,
    ForbiddenError,
    Get
} from 'routing-controllers';
import { User, ACL, Role, Query } from 'leanengine';

import { LCContext } from '../utility';
import { UserRole } from '../model';

@JsonController('/role')
export class RoleController {
    static async create(name: string, user: User) {
        const acl = new ACL();

        acl.setPublicReadAccess(true),
            acl.setPublicWriteAccess(false),
            acl.setWriteAccess(user, true);

        const admin = await new Query(Role)
            .equalTo('name', UserRole.Admin)
            .first();

        if (admin) acl.setRoleWriteAccess(admin, true);

        const role = new Role(name, acl);

        role.getUsers().add(user);

        return role.save();
    }

    static async isAdmin(user: User) {
        const list = await user.getRoles();

        return !!list.find(role => role.getName() === UserRole.Admin);
    }

    @Post()
    async create(
        @Ctx() { currentUser }: LCContext,
        @Body() { name }: { name: string }
    ) {
        if (!currentUser) throw new UnauthorizedError();

        if (!(await RoleController.isAdmin(currentUser)))
            throw new ForbiddenError();

        const role = await RoleController.create(name, currentUser);

        return role.toJSON();
    }

    @Get()
    async getAll(@Ctx() { currentUser }: LCContext) {
        if (!currentUser) throw new UnauthorizedError();

        if (!(await RoleController.isAdmin(currentUser)))
            throw new ForbiddenError();

        const list = await new Query(Role).find();

        return list.map(item => item.toJSON());
    }
}
