'usestrict';
const egg = require('egg');
module.exports = class IndexController extends egg.Controller {
  
  async ssr() {
    const result = this.service.article.getArtilceList();
    await this.ctx.render('index/index.js', result);
  }

  async csr() {
    const result = this.service.article.getArtilceList();
    await this.ctx.renderClient('index/index.js', result);
  }

  async list() {
    // this.ctx.body = this.service.article.getArtilceList();
    const list = await this.service.article.getArtilceList();
    await this.ctx.render('index/index.js', { total: list.total, list: list.list });
  }

  async detail() {
    const id = this.ctx.query.id;
  }
  // 新增2019年12月6日08:59:39
  async menuslist(){
    // 请求到菜单列表
    // const query = ctx.query;
    // const result = this.service.article.list()
    this.ctx.body = await this.ctx.service.article.getMenuList();
    // await this.ctx.renderClient('index/index.js', result);
  }
};
