const egg = require('egg');

module.exports = class productService extends egg.Service {
  async getmanufactorList(json) {
    const pageIndex = json ? parseInt(json.pageIndex) : 0;
    const pageSize = json ? parseInt(json.pageSize) : 10;
    const name = json ? json.name: [];
    let sql = '', list =  [], total;
    if (name && name.length) {
      sql = "select * FROM product_manufactor where name like ? LIMIT ?,?";
      list = await this.app.mysql.query(sql,['%'+name+'%',(pageIndex - 1) * pageSize ,pageSize]);
      total = await this.app.mysql.query('select COUNT(*) sum FROM product_manufactor where manufactor_name like ?', ['%'+name+'%']);
    } else {
      total = await this.app.mysql.query('select COUNT(*) sum FROM product_manufactor');
      sql = "select * FROM product_manufactor LIMIT ?,?";
      if (json == undefined) {
        list = await this.app.mysql.query(sql,[0 ,total[0].sum]);
      } else {
        list = await this.app.mysql.query(sql,[(pageIndex - 1) * pageSize ,pageSize]);
      }
    }
    return {list, total: total[0].sum};
  }
  async saveManufactor(json) {
    let result = [], data = {},errorJosn = {
      code: '500',
      success: false,
      message: ''
    };
    if (json.id) {
      if (json.name) {
        data.manufactor_name = json.name;
      } else {
        errorJosn.message = '请输入厂家名称'
        return result = errorJosn
      }
      if (json.addr) {
        data.manufactor_addr = json.addr;
      } else {
        errorJosn.message = '请输入厂家地址'
        return result = errorJosn
      }
      data.id = json.id;
      result = this.app.mysql.update('product_manufactor', data);
    } else {
      if (json.name) {
        data.manufactor_name = json.name;
      } else {
        errorJosn.message = '请输入厂家名称'
        return result = errorJosn
      }
      if (json.addr) {
        data.manufactor_addr = json.addr;
      } else {
        errorJosn.message = '请输入厂家地址'
        return result = errorJosn
      }
      data.manufactor_code = 'm2019-'+(~~(Math.random() * (1 << 30))).toString(36);// 生成唯一id
      data.create_time = '2019-12-27';// 生成唯一id
      result = this.app.mysql.insert('product_manufactor', data);
    }
    return result;
  }
  async delManufactor(id) {
    if(id) {
      const idArr = id.split(',')
      // const sql = "DELETE FROM news WHERE id IN ?"
      let list = await this.app.mysql.delete('product_manufactor', {id: idArr});
      return list;
    }
  }
  async getbrandList(json) {
    const pageIndex = json ? parseInt(json.pageIndex) : 0;
    const pageSize = json ? parseInt(json.pageSize) : 10;
    const name = json ? json.name: [];
    let sql = '', list =  [], total;
    if (name && name.length) {
      sql = "select * FROM product_brand where name like ? LIMIT ?,?";
      list = await this.app.mysql.query(sql,['%'+name+'%',(pageIndex - 1) * pageSize ,pageSize]);
      total = await this.app.mysql.query('select COUNT(*) sum FROM product_brand where manufactor_name like ?', ['%'+name+'%']);
    } else {
      total = await this.app.mysql.query('select COUNT(*) sum FROM product_brand');
      sql = "select * FROM product_brand LIMIT ?,?";
      if (json == undefined) {
        list = await this.app.mysql.query(sql,[0 ,total[0].sum]);
      } else {
        list = await this.app.mysql.query(sql,[(pageIndex - 1) * pageSize ,pageSize]);
      }
    }
    return {list, total: total[0].sum};
  };
  async savebrand(json) {
    let result = [], data = {}, errorJosn = {
      code: '500',
      success: false,
      message: ''
    };
    if (json.name) {
      data.brand_name = json.name;
    } else {
      errorJosn.message = '请输入品牌名称'
      return result = errorJosn
    }
    if (json.manufactorId) {
      const sql = "select manufactor_brands FROM product_manufactor where manufactor_code = ?";
      const manufaBrandObj = await this.app.mysql.query(sql,[json.manufactorId]);
      const mbObj = manufaBrandObj[0].manufactor_brands;
      let newManufaBrandList = '';
      console.log('>>>>manufaObj:', manufaBrandObj)
      console.log('>>>>mbObj:', mbObj)
      let status = true;
      if (mbObj !== null && mbObj !== '') {
        const manufaBrandList = mbObj.toString().split(',');
        console.log('>>>>manufaBrandList:', manufaBrandList)
        manufaBrandList.map(item=> {
          if (item === json.name) {
            status = false
          }
        })
        newManufaBrandList = mbObj+','+json.name
      } else {
        newManufaBrandList = json.name;
      }
      if(status) {
        const sql = "update product_manufactor set manufactor_brands = ? where manufactor_code = ?"
        this.app.mysql.query(sql, [newManufaBrandList, json.manufactorId]);
      }
      data.brand_manufacturer_Id = json.manufactorId;
      data.brand_manufacturer_name = json.manufactorName;

    } else {
      errorJosn.message = '请选择所属厂家'
      return result = errorJosn
    }
    // 此处需要先查询厂家表，判断是否品牌是否已存在

    if (json.id) {
      data.id = json.id;
      result = this.app.mysql.update('product_brand', data);
    } else {
      data.brand_code = 'b2019-'+(~~(Math.random() * (1 << 30))).toString(36);// 生成唯一id
      data.create_time = '2019-12-27';// 生成唯一id
      result = this.app.mysql.insert('product_brand', data);
    }
    return result;
  };
  async delbrand(id) {
    if(id) {
      const idArr = id.split(',')
      // const sql = "DELETE FROM news WHERE id IN ?"
      let list = await this.app.mysql.delete('product_brand', {id: idArr});
      return list;
    }
  }
}
