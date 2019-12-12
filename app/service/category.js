'use strict';
const egg = require('egg');
const Query = require('../lib/db/query');
module.exports = class CategoryService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
  }
  async getList(json = {}) {
    const { title, categoryId, status, pageIndex, pageSize } = json;
    const query = new Query();
    query.where.categoryId = categoryId;
    query.where.status = status;
    query.like.title = title;
    query.pageIndex = pageIndex;
    query.pageSize = pageSize;
    // return this.colllection.getPager(query);
    let list = await this.app.mysql.select('category', {
      limit: 10
    });
    return list;
  }
};
