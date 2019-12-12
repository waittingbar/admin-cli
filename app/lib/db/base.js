'use strict';
const shortid = require('shortid');
module.exports = class DB {
  constructor(name = 'news') {
    this.name = name;
  }
  getUniqueId() {
    return shortid.generate();
  }
  get(collectionName) {
    return null;
  }
  add(collectionName, json) {
    return null;
  }
  update(collectionName, where, json) {
    return null;
  }
  delete(collectionName, field) {
    return null;
  }
  getPager(collectionName, query) {
    return null;
  }
};
