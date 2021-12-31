'use strict';

const Controller = require('egg').Controller;

class HelloController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'Hello';
  }
}

module.exports = HelloController;
