'use strict';

const Controller = require('egg').Controller;

class WeChatController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'Hello';
  }
}

module.exports = WeChatController;
