/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  const path = require('path');
  const os = require('os');
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1629785074836_2069';

  // config.middleware = [
  //   'robot',
  // ];
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };
  config.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };

  config.multipart = {
    // mode: 'file',
    mode: 'stream',
    fileModeMatch: /^\/uploadFile$/, //    uploadFile接口使用file模式，其他使用stream模式
    tmpdir: path.join(os.tmpdir(), 'egg-multipart-tmp', appInfo.name),
    cleanSchedule: {
      // run tmpdir clean job on every day 04:30 am
      cron: '0 30 4 * * *',
    },
    fileSize: '500mb', //    文件大小限制-string, 错误：400 Bad request
    // eslint-disable-next-line no-undef
    // whitelist, //    文件类型-白名单-array, 错误：400 Bad request
  };
  // 覆盖egg自带的配置 使支持接收xml参数
  config.bodyParser = {
    enable: true,
    encoding: 'utf8',
    formLimit: '100kb',
    jsonLimit: '100kb',
    strict: true,
    // @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000,
    },
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      text: ['text/xml', 'application/xml'],
    },
  };
  config.wx = {
    appid: 'wx725a810d3b6f5c98',
    appSecret: '51f6e82eed664f9cd9dac154be64f6e0',
  };
  // EGG配置跨域 在config.{ env }.js中配置，注意配置覆盖的问题
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // domainWhiteList: ['*'], // 白名单
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
