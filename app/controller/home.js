/* eslint-disable no-unused-vars */
'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');

const parseString = require('xml2js').parseString;


class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const q = ctx.query;
    const signature = q.signature;
    const token = 'firefly';
    const echostr = q.echostr;
    const timestamp = q.timestamp;
    const nonce = q.nonce;
    // eslint-disable-next-line no-array-constructor
    const array = new Array(token, timestamp, nonce);
    array.sort();
    const _signature = crypto.createHash('sha1').update(array.toString().replace(/,/g, ''), 'utf-8').digest('hex');
    // 获取请求信息
    const dataList = await this.data();
    if (_signature === signature) {
      ctx.body = `${echostr}`;
      // eslint-disable-next-line keyword-spacing
    } else {
      ctx.body = {
        code: 200,
        message: 'success',
        data: dataList,
      };
    }
  }
  async index2() {
    const { ctx } = this;
    let body = '';
    ctx.req.on('data', data => {
      body += data;
    });
    const xml = ctx.request.body;
    console.log(xml);
    parseString(xml, function (err, result) {
      const xmlData = result.xml;
      const msgType = xmlData.MsgType[0]; // 消息类型，event
      const createTime = Date.parse(new Date());
      const toUserName = xmlData.ToUserName[0]; // 开发人员微信号
      const toFromName = xmlData.FromUserName[0]; // 发送方帐号（一个OpenID）
      ctx.body = `<xml>
        <ToUserName><![CDATA[${toFromName}]]></ToUserName>
        <FromUserName><![CDATA[${toUserName}]]></FromUserName>
        <CreateTime>${createTime}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[你是什么牛马]]></Content>
      </xml>`;
    });
  }
  async data() {
    return {
      list: [
        { id: 1, title: 'news1', url: 'https://i.loli.net/2019/05/20/5ce26578e0e5549312.png' },
        { id: 2, title: 'news2', url: 'https://i.loli.net/2019/05/20/5ce2657a0e01277224.png' },
        { id: 3, title: 'news3', url: 'https://i.loli.net/2019/05/20/5ce2657b67be250185.png' },
      ]
    }
  }
}

module.exports = HomeController;
