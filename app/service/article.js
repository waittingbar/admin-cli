'use strict';
const egg = require('egg');
const Collection = require('../lib/db/collection');
const Query = require('../lib/db/query');
module.exports = class ArticeService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
  }
  async getArtilceList(json) {
    console.log('>>>------------',json)
    const pageIndex = json ? parseInt(json.pageIndex) : 0;
    const pageSize = json ? parseInt(json.pageSize) : 10;
    const title = json ? json.title: [];
    let sql = '', list =  [], total;
    if (title && title.length) {
      sql = "select id, title, summary, url,DATE_FORMAT(time,'%Y-%m-%d %T') time FROM news where title like ? LIMIT ?,?";
      list = await this.app.mysql.query(sql,['%'+title+'%',pageIndex * pageSize - pageSize ,pageSize]);
      total = await this.app.mysql.query('select COUNT(*) sum FROM news where title like ?', ['%'+title+'%']);
    } else {
      total = await this.app.mysql.query('select COUNT(*) sum FROM news');
      sql = "select id, title, summary, url,DATE_FORMAT(time,'%Y-%m-%d %T') time FROM news LIMIT ?,?";
      if (json == undefined) {
        list = await this.app.mysql.query(sql,[0 ,total[0].sum]);
      } else {
        list = await this.app.mysql.query(sql,[pageIndex * pageSize - pageSize ,pageSize]);
      }
    }
    return {list, total: total[0].sum};
  }
  getMenuList() {
    let list = this.app.mysql.select('category', {
      limit: 10
    });
    return list;
  }
  getArticle(id) {
    return '';
  }
  // 修改/插入一条文章
  saveArticle(json) {
    let list = [];
    if (json.id) {
      list = this.app.mysql.update('news', json);
    } else {
      list = this.app.mysql.insert('news', json);
    }
    return list;
  }
  async deleteArticle(id) {
    console.log('>>>>>>>>>>>', id)
    if(id) {
      const idArr = id.split(',')
      // const sql = "DELETE FROM news WHERE id IN ?"
      let list = await this.app.mysql.delete('news', {id: idArr});
      return list;
    }
  }
};
