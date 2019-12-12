const egg = require('egg');

module.exports = class MenusService extends egg.Service {
  async getMenusList(json) {
    const pageIndex = json ? parseInt(json.pageIndex) : 0;
    const pageSize = json ? parseInt(json.pageSize) : 10;
    const name = json ? json.name: [];
    let sql = '', list =  [], total;
    if (name && name.length) {
      sql = "select * FROM category where name like ? LIMIT ?,?";
      list = await this.app.mysql.query(sql,['%'+name+'%',pageIndex * pageSize - pageSize ,pageSize]);
      total = await this.app.mysql.query('select COUNT(*) sum FROM category where name like ?', ['%'+name+'%']);
    } else {
      total = await this.app.mysql.query('select COUNT(*) sum FROM category');
      sql = "select * FROM category LIMIT ?,?";
      if (json == undefined) {
        list = await this.app.mysql.query(sql,[0 ,total[0].sum]);
      } else {
        list = await this.app.mysql.query(sql,[pageIndex * pageSize - pageSize ,pageSize]);
      }
    }
    return {list, total: total[0].sum};
  }
  async saveMenus(json) {
    let list = [];
    if (json.id) {
      list = this.app.mysql.update('category', json);
    } else {
      json.uid = 'm'+(~~(Math.random() * (1 << 30))).toString(36);// 生成唯一id
      list = this.app.mysql.insert('category', json);
    }
    return list;
  }
  async deleteMenus(id) {
    if(id) {
      const idArr = id.split(',')
      // const sql = "DELETE FROM news WHERE id IN ?"
      let list = await this.app.mysql.delete('category', {id: idArr});
      return list;
    }
  }
  async getarticleAndMenuTotal() {
    const conn = await this.app.mysql.beginTransaction();
    try {
     let mTotal = await conn.query('select COUNT(*) sum FROM category');
     let aTotal = await conn.query('select COUNT(*) sum FROM news');
      await conn.commit();
      return {aTotal: aTotal[0].sum, mTotal: mTotal[0].sum}
    }catch(err) {
      await conn.rollback(); // 回滚事务
      throw err;
    }
  }
}
