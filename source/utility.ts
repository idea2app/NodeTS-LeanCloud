import fetch from 'node-fetch';
import { AuthOptions, Queriable, Query } from 'leanengine';

interface QueryOptions {
    equal?: Record<string, any>;
    less?: Record<string, any>;
    greater?: Record<string, any>;
    startsWith?: Record<string, string>;
    contains?: Record<string, string>;
    matches?: Record<string, string>;
}

export function makeQuery<T extends Queriable>(
    model: new (...args: any[]) => T,
    { equal, less, greater, startsWith, contains, matches }: QueryOptions
) {
    const query = new Query<T>(model);

    for (const key in equal)
        if (equal[key] != null) query.equalTo(key, equal[key]);

    for (const key in less)
        if (less[key] != null) query.lessThanOrEqualTo(key, less[key]);

    for (const key in greater)
        if (greater[key] != null) query.greaterThanOrEqualTo(key, greater[key]);

    for (const key in startsWith) query.startsWith(key, startsWith[key]);

    for (const key in contains) query.contains(key, contains[key]);

    for (const key in matches) query.contains(key, matches[key]);

    return query;
}

interface FetchOptions {
    size?: number;
    index?: number;
    ascend?: string[];
    descend?: string[];
    select?: string[];
    include?: string[];
}

export async function fetchPage<D, M extends Queriable = Queriable>(
    query: Query<M>,
    {
        size = 10,
        index = 1,
        ascend = [],
        descend = ['updatedAt', 'createdAt'],
        select = [],
        include = []
    }: FetchOptions = {},
    auth?: AuthOptions
) {
    const count = await query.count(auth);

    if (!count) return { data: [], count };

    for (const key of ascend) query.addAscending(key);

    for (const key of descend) query.addDescending(key);

    query.limit(size).skip(size * --index);

    if (select[0]) query.select(...select);

    if (include[0]) query.include(...include);

    const data = (await query.find(auth)).map(item => item.toJSON() as D);

    return { data, count };
}

const { WMA_ID, WMA_KEY } = process.env;
/**
 * @see https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
 */
export async function getWechatSession(code: string) {
    const response = await fetch(
        `https://api.weixin.qq.com/sns/jscode2session?${new URLSearchParams({
            appid: WMA_ID,
            secret: WMA_KEY,
            js_code: code,
            grant_type: 'authorization_code'
        })}`
    );
    const {
        openid,
        session_key,
        unionid,
        errcode,
        errmsg
    } = await response.json();

    if (errcode) throw URIError(errmsg);

    return { openid, session_key, unionid };
}
