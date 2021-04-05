# NodeTS LeanCloud

基于 [TypeScript][1]、[Koa][2]、[Swagger][3] 和 [LeanCloud][4] 的 **Node.js 后端**项目脚手架

[![NPM Dependency](https://david-dm.org/idea2app/NodeTS-LeanCloud.svg)][5]
[![CI & CD](https://github.com/idea2app/NodeTS-LeanCloud/workflows/CI%20&%20CD/badge.svg)][6]

## 主要特性

-   [HTTP RESTful 服务](source/WebServer.ts)
    1. [LeanCloud 手机短信验证码登录](source/controller/Session.ts#L40-L57)
    2. [LeanCloud 微信 OAuth 登录](source/controller/Session.ts#L59-L71)
    3. [用户管理](source/controller/User.ts)
-   [WebSocket 服务](source/SocketServer.ts)

## 环境变量

|     变量名     |         作用         |
| :------------: | :------------------: |
| `ROOT_ACCOUNT` | 超级管理员（手机号） |
|    `WMA_ID`    |     微信 App ID      |
|   `WMA_KEY`    |     微信 App Key     |

## 本地开发

1. 注册 [LeanCloud][4] 账号

2. 安装 [LeanCloud CLI](https://leancloud.cn/docs/leanengine_cli.html#hash1443149115)

3. 安装 [Node.js](https://nodejs.org/en/download/package-manager/)

4. `git clone https://github.com/idea2app/NodeTS-LeanCloud.git`

5. 在本项目文件夹执行安装命令，并登录 LeanCloud 账号，再切换到本应用后启动

```shell
npm install
npx husky install

lean login
lean switch
lean up
```

6. 建议安装 [NIM 调试扩展][7]

[1]: https://www.typescriptlang.org/
[2]: https://koajs.com/
[3]: https://swagger.io/
[4]: https://leancloud.cn/
[5]: https://david-dm.org/idea2app/NodeTS-LeanCloud
[6]: https://github.com/idea2app/NodeTS-LeanCloud/actions
[7]: https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj
