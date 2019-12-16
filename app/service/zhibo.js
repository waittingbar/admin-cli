'use strict';

const egg = require('egg');
module.exports = class ZhiboService extends egg.Service {
  async getList(pageIndex, pageSize) {
    let offset = (pageIndex - 1) * pageSize || 0;
    let limit = parseInt(pageSize) || 10;
    let sql = "SELECT id, title, url, DATE_FORMAT(time,'%T') time FROM zhibo LIMIT ?,?";
    const list = await this.app.mysql.query(sql,[offset,limit]);
    const total = await this.app.mysql.query('select COUNT(*) sum FROM zhibo');
    return {
      status: true,
      list,
      total
    };
  }
}
