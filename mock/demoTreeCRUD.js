export default {
  'GET /api/config/menu/': {
    count: 7,
    results: [
      {
        name: 'name-1',
        id: 1,
        parent_id: 0,
      },
      {
        name: 'name-17',
        id: 17,
        parent_id: 1,
      },
      {
        name: 'name-18',
        id: 18,
        parent_id: 1,
      },
      {
        name: 'name-2',
        id: 2,
        parent_id: 0,
      },
      {
        name: 'name-27',
        id: 27,
        parent_id: 2,
      },
    ],
  },
  'POST /api/config/menu/': {
    name: 'name-71',
    id: 7,
    parent_id: 0,
  },
  'PATCH /api/config/menu/:id/': {
    name: 'name-89',
    id: 8,
    parent_id: 0,
  },
  'DELETE /api/config/menu/': () => '',
};
