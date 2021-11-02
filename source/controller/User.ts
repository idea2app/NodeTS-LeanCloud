import {
    JsonController,
    Get,
    Authorized,
    QueryParams,
    Param,
    Patch,
    Body
} from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { User, Query, Object as LCObject } from 'leanengine';

import { fetchPage } from '../utility';
import { BaseQuery, UserRole, UserModel, UserList } from '../model';

@JsonController('/user')
export class UserController {
    @Get()
    @Authorized(UserRole.Admin)
    @ResponseSchema(UserList)
    getList(
        @QueryParams() { keyword, pageSize: size, pageIndex: index }: BaseQuery
    ) {
        return fetchPage(
            Query.or(
                new Query(User).contains('username', keyword),
                new Query(User).contains('email', keyword),
                new Query(User).contains('mobilePhoneNumber', keyword)
            ),
            { size, index },
            { useMasterKey: true }
        );
    }

    @Get('/:id')
    @ResponseSchema(UserModel)
    async getOne(@Param('id') id: string) {
        const user = await LCObject.createWithoutData(User, id).fetch();

        return user.toJSON() as UserModel;
    }

    @Patch('/:id')
    @Authorized(UserRole.Admin)
    @ResponseSchema(UserModel)
    async editUser(@Param('id') id: string, @Body() data: UserModel) {
        return (
            await LCObject.createWithoutData(User, id).save(data, {
                useMasterKey: true
            })
        ).toJSON() as UserModel;
    }
}
