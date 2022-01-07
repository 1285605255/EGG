'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/home/index2', controller.home.index2);
  router.get('/hello', controller.hello.index);
  router.get('/wechat', controller.wechat.index);
  router.get('/user', controller.user.code2Session);
  router.post('/UserPhoneNumber', controller.user.getUserPhoneNumber);
  router.post('/video', controller.video.upLoadVideo);
  router.post('/streamVideo', controller.video.streamUpLoadVideo);
  router.get('/list', controller.news.list);
};
