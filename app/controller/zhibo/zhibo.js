"use strict";
const Controller = require('egg').Controller;
class ZhiboController extends Controller {
  async index() {
    const {ctx, service } = this;
    await ctx.render('zhibo/list/list.js');
  };
  async detail(ctx) {
    const id = ctx.params.id;
    console.log(">>>>>>>>>>>>id", id)
    await ctx.render('zhibo/detail/detail.js', {id});
  }
  async list() {
    const { ctx, service } = this;
    ctx.body = await service.zhibo.getList();
  }
  async detailInfo() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    ctx.body = await service.zhibo.getDetail(Number(id));
  }
  async grabZhibo() {
    const { ctx, service } = this;
    await ctx.render('zhibo/grabzhibo/grabzhibo.js');
  }
}
module.exports = ZhiboController;
