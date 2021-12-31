'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async getWxOpenId(code) {
    const { ctx } = this;
    const { wx: { appId, appSecret } } = ctx.app.config;
    const result = await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`)
    console.log(result.res);
  }
}


module.exports = UserService;
