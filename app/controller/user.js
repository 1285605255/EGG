'use strict';
// app/controller/news.js
const Controller = require('egg').Controller;

class UserController extends Controller {
  async wxLogin() {
    const ctx = this.ctx;
    const { code } = ctx.request.body;
    await ctx.service.user.getWxOpenId(code);
    ctx.body = {
      success: true,
    };
  }
}

module.exports = UserController;
