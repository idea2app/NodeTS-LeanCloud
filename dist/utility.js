"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWechatSession = exports.fetchPage = exports.makeQuery = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = (0, tslib_1.__importDefault)(require("node-fetch"));
const leanengine_1 = require("leanengine");
function makeQuery(model, { equal, less, greater, startsWith, contains, matches }) {
    const query = new leanengine_1.Query(model);
    for (const key in equal)
        if (equal[key] != null)
            query.equalTo(key, equal[key]);
    for (const key in less)
        if (less[key] != null)
            query.lessThanOrEqualTo(key, less[key]);
    for (const key in greater)
        if (greater[key] != null)
            query.greaterThanOrEqualTo(key, greater[key]);
    for (const key in startsWith)
        query.startsWith(key, startsWith[key]);
    for (const key in contains)
        query.contains(key, contains[key]);
    for (const key in matches)
        query.contains(key, matches[key]);
    return query;
}
exports.makeQuery = makeQuery;
async function fetchPage(query, { size = 10, index = 1, ascend = [], descend = ['updatedAt', 'createdAt'], select = [], include = [] } = {}, auth) {
    const count = await query.count(auth);
    if (!count)
        return { data: [], count };
    for (const key of ascend)
        query.addAscending(key);
    for (const key of descend)
        query.addDescending(key);
    query.limit(size).skip(size * --index);
    if (select[0])
        query.select(...select);
    if (include[0])
        query.include(...include);
    const data = (await query.find(auth)).map(item => item.toJSON());
    return { data, count };
}
exports.fetchPage = fetchPage;
const { WMA_ID, WMA_KEY } = process.env;
/**
 * @see https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
 */
async function getWechatSession(code) {
    const response = await (0, node_fetch_1.default)(`https://api.weixin.qq.com/sns/jscode2session?${new URLSearchParams({
        appid: WMA_ID,
        secret: WMA_KEY,
        js_code: code,
        grant_type: 'authorization_code'
    })}`);
    const { openid, session_key, unionid, errcode, errmsg } = await response.json();
    if (errcode)
        throw URIError(errmsg);
    return { openid, session_key, unionid };
}
exports.getWechatSession = getWechatSession;
//# sourceMappingURL=utility.js.map