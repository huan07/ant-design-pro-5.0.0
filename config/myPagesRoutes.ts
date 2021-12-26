export default {
  name: 'demo',
  path: '/demo',
  routes: [
    // todo 样板代码
    {
      name: 'edit',
      icon: 'crown',
      path: '/demo/edit',
      component: '../myPages/Demo/Edit',
    },

    {
      name: 'detail',
      icon: 'crown',
      path: '/demo/detail',
      component: '../myPages/Demo/Detail',
    },
    {
      name: 'list',
      icon: 'crown',
      path: '/demo/list',
      component: '../myPages/Demo',
    },
    //
    // todo 子组件调用Demo
    {
      name: 'modal',
      icon: 'crown',
      path: '/demo/modal',
      component: '../myPages/DemoModal',
    },
    {
      name: 'table',
      icon: 'crown',
      path: '/demo/table',
      component: '../myPages/DemoTable',
    },
    {
      name: 'drawer',
      icon: 'crown',
      path: '/demo/drawer',
      component: '../myPages/DemoDrawer',
    },
    //
    // todo 样板代码
    {
      name: 'table-crud',
      icon: 'crown',
      path: '/demo/table-crud',
      component: '../myPages/DemoTableCRUD',
    },
    {
      name: 'tree-crud',
      icon: 'crown',
      path: '/demo/tree-crud',
      component: '../myPages/DemoTreeCRUD',
    },
  ],
};
