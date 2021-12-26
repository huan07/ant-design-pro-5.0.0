/*
 * @Author: kate.yang
 * @Date: 2021-09-15 19:17:10
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-10-16 08:25:57
 */

import myReactHooksCourseRoutes from './myReactHooksCourseRoutes';

import myPagesRoutes from './myPagesRoutes'; // 业务样板代码

export default [
  myReactHooksCourseRoutes,
  myPagesRoutes,
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    // redirect: '/welcome',
    redirect: '/hooks-learn/use-state',
  },
  {
    component: './404',
  },
];
