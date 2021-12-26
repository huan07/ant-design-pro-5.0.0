export default {
  'GET /api/project/': [
    {
      app_id: '102141',
      id: 1523,
      name: 'h5-ssr-k8s-nginx',
      lang: 'NODE',
    },
    {
      app_id: '102140',
      id: 1522,
      name: 'poizon-clound-robot',
      lang: 'JAVA',
    },
    {
      app_id: '102139',
      id: 1521,
      name: 'related-suggest-blade-a',
      lang: 'JAVA',
    },
  ],
  'GET /api/project/env/': {
    prd: {
      as: '生产环境',
      list: [
        {
          env: 'xdwprd',
          title: '小得物-灰度生产',
        },
        {
          env: 'prd-cs',
          title: '五彩石-生产',
        },
      ],
    },
    pre: {
      as: '预发环境',
      list: [
        {
          env: 'pre',
          title: '预发',
        },
      ],
    },
  },
  'GET /api/project/branches/': {
    data: [
      {
        commit: {
          committer_name: 'yanghuan',
          committed_date: '2021-11-19T17:53:33.000+08:00',
        },
        name: 'release',
      },
      {
        commit: {
          committer_name: 'yanghuan',
          committed_date: '2019-11-27T08:11:19.000+08:00',
        },
        name: 'dev/yh-0911',
      },
    ],
    status: 200,
  },
};
