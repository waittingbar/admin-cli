const menu = {
  home: {
    name: 'menu.home',
    path: '/',
    icon: 'el-icon-menu',
  },
  content: {
    name: 'menu.articlemanage',
    icon: 'el-icon-document',
    children: {
      list: {
        name: 'menu.articlequery',
        icon: 'el-icon-edit-outline',
        path: '/article/list'
      }
    }
  },
  menucontent: {
    name: 'menu.menumanage',
    icon: 'el-icon-document',
    children: {
      list: {
        name: 'menu.menuquery',
        icon: 'el-icon-edit-outline',
        path: '/menus/list'
      }
    }
  }
};

export default menu;
