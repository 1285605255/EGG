'use strict';

const Controller = require('egg').Controller;

const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;

class VideoController extends Controller {
  async upLoadVideo() {
    const { ctx } = this;
    ctx.body = {
      code: 200,
      status: 'success',
      data: ctx.request.files,
    };
  }
  async streamUpLoadVideo({ request }) {
    const { ctx } = this;
    const stream = await ctx.getFileStream(); // 创建流传输模式
    const filename = stream.filename; // 获取文件名
    const uploadBasePath = '../../app/public/upload/'; // 上传基础目录
    const dir = path.join(__dirname, uploadBasePath);
    const dirData = path.join(__dirname, uploadBasePath, filename);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    if (fs.existsSync(dirData)) {
    //   this.operationLogger(request, '上传', false);
      ctx.body = { message: '此文件名已存在', code: '4000', data: [] };
      ctx.status = 200;
      return;
    }
    const target = path.join(__dirname, uploadBasePath, filename);
    const imgUrl = 'public/upload/' + filename;
    // 写入流
    const writeStream = fs.createWriteStream(target);
    try {
      // 写入文件
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      // eslint-disable-next-line no-undef
      await sendToWormhole(stream);
      throw err;
    }
    ctx.body = {
      code: 2000,
      data: { imgUrl },
      message: '上传成功',
    };

  }
}

module.exports = VideoController;
