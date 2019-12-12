'use strict';
const Base = require('./base');
module.exports = class MySQLDB extends Base {
  constructor(name) {
    super(name);
    // this.ctx = ctx;
    // this.app = ctx.app;
    // this.config = ctx.app.config;
    // this.create();
  }
  create() {
    // this.instance.defaults({
    //   article: [],
    //   user: {}
    // }).write();
  }
  async getNewsList(collectionName, json) {
    // let newsList = await this.app.mysql.get('news', {id:1}); // 方式一
    const page = 1;
    // const { pageSize } = this.config.pageSize;
    const pageSize = 10;
    console.log('-------开始--------')
    console.log('lowdb',lowdb)
    console.log('lodashid',lodashid)
    console.log('FileSync',FileSync)
    console.log('------------------')
    let list = await this.app.mysql.select(collectionName,{
      // where: { status: 'draft', author: ['author1', 'author2'] }, // WHERE 条件
      // columns: ['author', 'title'], // 要查询的表字段
      // orders: [['created_at','desc'], ['id','desc']], // 排序方式
      limit: page * pageSize, // 返回数据量
      offset: 0, // 数据偏移量
    }); // 方式二
    console.log('++++list++++', list);
    return {
      total: list.length,
      list,
    };
  }
};
