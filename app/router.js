'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.index.index.ssr);
  router.get('/csr', controller.index.index.csr);
  router.get('/list', controller.index.index.list);
  router.get('/menuslist', controller.index.index.menuslist);
  router.get('/category', controller.category.category.index);
  router.get('/login', controller.admin.admin.login);
  router.get('/admin/api/article/list', controller.admin.admin.list);
  router.post('/admin/api/article/add', controller.admin.admin.add);
  router.get('/admin/api/article/del', controller.admin.admin.del);
  router.get('/admin/api/article/:id', controller.admin.admin.detail);
  router.get('/admin/api/menus/list', controller.admin.admin.menusList)
  router.post('/admin/api/menus/add', controller.admin.admin.menusAdd)
  router.get('/admin/api/menus/del', controller.admin.admin.menusDel);
  router.get('/admin/api/articleAndMenuTotal', controller.admin.admin.articleAndMenuTotal);
  router.get('/admin/api/manufactor/list', controller.admin.admin.manufactorList);
  router.post('/admin/api/manufactor/add', controller.admin.admin.manufactorAdd);
  router.get('/admin/api/manufactor/del', controller.admin.admin.manufactorDel);
  router.get('/admin/api/brand/list', controller.admin.admin.brandList);
  router.post('/admin/api/brand/add', controller.admin.admin.brandAdd);
  router.get('/admin/api/brand/del', controller.admin.admin.brandDel);
  router.get('/admin(/.+)?', controller.admin.admin.home); // 必须是后台的最好一个？？
  // 直播中心
  router.get('/zhibo', controller.zhibo.zhibo.index);
  router.get('/zhibo/detail/:id', controller.zhibo.zhibo.detail);
  router.get('/zhibo/api/list', controller.zhibo.zhibo.list);
  router.get('/zhibo/api/detail/:id', controller.zhibo.zhibo.detailInfo);
};
