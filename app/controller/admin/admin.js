"use strict";
const egg = require("egg");
module.exports = class AdminController extends egg.Controller {
  async login(ctx) {
    await ctx.renderClient("admin/login/login.js", {});
  }
  async home(ctx) {
    const url = ctx.url.replace(/\/admin/, "");
    const { mode } = ctx.query;
    if (mode === "csr") {
      await ctx.renderClient("admin/home/home.js", {
        ctx,
        url,
        title: "easy-admin"
      });
    } else {
      await ctx.render("admin/home/home.js", {
        ctx,
        url,
        title: "easy-admin"
      });
    }
  }
  // 后台中获取新闻list，api接口
  async list(ctx) {
    // get请求用ctx.request.query
    ctx.body = await this.ctx.service.article.getArtilceList(ctx.request.query);
    // this.ctx.body = await this.ctx.service.article.getMenuList();
  }
  async add(ctx) {
    // post请求用ctx.request.body
    ctx.body = await this.ctx.service.article.saveArticle(ctx.request.body);
  }
  async del(ctx) {
    const { id } = ctx.request.query;
    ctx.body = await this.ctx.service.article.deleteArticle(id);
  }
  async detail(ctx) {
    const id = ctx.params.id;
    console.log(">>id", Number(id));
    ctx.body = this.service.article.getArticle(Number(id));
  }
  // 查询菜单list
  async menusList(ctx) {
    ctx.body = await this.ctx.service.menus.getMenusList(ctx.request.query);
  }
  async menusAdd(ctx) {
    // post请求用ctx.request.body
    ctx.body = await this.ctx.service.menus.saveMenus(ctx.request.body);
  }
  async menusDel(ctx) {
    const { id } = ctx.request.query;
    ctx.body = await this.ctx.service.menus.deleteMenus(id);
  }
  // 获取后台首页的合计数据
  async articleAndMenuTotal(ctx) {
    ctx.body = await this.ctx.service.menus.getarticleAndMenuTotal();
  }
};
