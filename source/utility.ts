import { Context } from 'koa';
import { User, Query, AuthOptions, Queriable } from 'leanengine';

export interface LCUser extends User {
    logOut(): any;
}

export interface LCContext extends Context {
    saveCurrentUser(user: User): any;
    currentUser: LCUser;
    clearCurrentUser(): any;
}

interface PageQuery {
    size?: number;
    index?: number;
    equal?: { [key: string]: any };
    include?: string[];
    auth?: AuthOptions;
}

export async function queryPage<T extends Queriable>(
    model: new (...args: any[]) => T,
    { size = 10, index = 1, equal, include = [], auth }: PageQuery
) {
    const countQuery = new Query<T>(model);

    for (const key in equal) countQuery.equalTo(key, equal[key]);

    const count = await countQuery.count(auth);

    if (!count) return { data: [], count };

    const listQuery = new Query<T>(model);

    for (const key in equal) listQuery.equalTo(key, equal[key]);

    listQuery.limit(size).skip(size * --index);

    if (include[0]) listQuery.include(...include);

    return {
        data: (await listQuery.find(auth)).map(item => item.toJSON()),
        count
    };
}
