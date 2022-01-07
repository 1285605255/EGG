'use strict';
// app/controller/news.js
const Controller = require('egg').Controller;

// import WXBizDataCrypt from '../utils/WXBizDataCrypt'
const WXBizDataCrypt = require('../utils/WXBizDataCrypt');

class UserController extends Controller {
  async wxLogin() {
    const ctx = this.ctx;
    console.log(ctx);
    const { code } = ctx.request.body;
    await ctx.service.user.getWxOpenId(code);
    ctx.body = {
      success: true,
    };
  }
  async code2Session() {

    const { ctx } = this;
    const code = ctx.request.url.split('=')[1];
    const wxApp = this.config.wx;

    const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + wxApp.appid + '&secret=' + wxApp.appSecret + '&js_code=' + code + '&grant_type=authorization_code';

    const res = await ctx.curl(url, {
      dataType: 'json',
    });
    const url1 = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wxApp.appid}&secret=${wxApp.appSecret}`;
    const res1 = await ctx.curl(url1, {
      dataType: 'json',
    });
    const accessToken = res1.data.access_token;
    if (res.data.openid) {
      ctx.body = {
        code: 0,
        mess: 'success!',
        data: {
          openid: res.data.openid,
          sta: true,
          sessionKey: res.data.session_key,
          AccessToken: accessToken,
        },
      };
    }

    return { // 忽略网络请求失败
      msg: res.data.errmsg,
      sta: false,
    };

  }
  async getUserPhoneNumber() {
    const { ctx } = this;
    const wxApp = this.config.wx;
    let { encryptedData, iv, sessionKey } = ctx.request.body;

    iv = decodeURIComponent(iv);
    sessionKey = decodeURIComponent(sessionKey);
    encryptedData = decodeURIComponent(encryptedData);
    const pc = new WXBizDataCrypt(wxApp.appid, sessionKey);
    const res = pc.decryptData(encryptedData, iv);
    ctx.body = {
      data: res,
    };
  }
}

module.exports = UserController;
