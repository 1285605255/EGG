/* eslint-disable no-unused-vars */
'use strict';

const crypto = require('crypto');
let that;

function WXBizDataCrypt(appId, sessionKey) {
  this.appId = appId;
  this.sessionKey = sessionKey;
  that = this;
}

WXBizDataCrypt.prototype.decryptData = (encryptedData, iv) => {
  // base64 decode
  let decoded;
  const sessionKey = new Buffer(that.sessionKey, 'base64');
  encryptedData = new Buffer(encryptedData, 'base64');
  iv = new Buffer(iv, 'base64');
  try {
    // 解密
    const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true);
    // eslint-disable-next-line no-unused-vars
    decoded = decipher.update(encryptedData, 'binary', 'utf8');
    decoded += decipher.final('utf8');
    decoded = JSON.parse(decoded);

  } catch (err) {
    throw new Error('Illegal Buffer');
  }

  // eslint-disable-next-line no-undef
  if (decoded.watermark.appid !== that.appId) {
    throw new Error('Illegal Buffer');
  }

  // eslint-disable-next-line no-undef
  return decoded;
};

module.exports = WXBizDataCrypt;
