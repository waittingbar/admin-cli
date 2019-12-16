"use strict";
const Controller = require('egg').Controller;
class ZhiboController extends Controller {
  async index() {
    const {ctx, service } = this;
    await ctx.render('zhibo/zhibo.js');
  };
  async list() {
    const { ctx, service } = this;
    ctx.body = await service.zhibo.getList();
  }
}
module.exports = ZhiboController;
