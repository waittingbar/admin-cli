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
  }, 
  zhibocontent: {
    name: 'menu.zhibomanage',
    icon: 'el-icon-document',
    children: {
      list: {
        name: 'menu.zhiboList',
        icon: 'el-icon-edit-outline',
        path: '/zhibo/list'
      },
      grab: {
        name: 'menu.zhibograb',
        icon: 'el-icon-edit-outline',
        path: '/zhibo/graburl'
      }
    }
  }
};

export default menu;
