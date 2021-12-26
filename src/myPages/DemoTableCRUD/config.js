import { InputFC } from '@/myComponents';

export const DEFAULT_EDIT_RECORD = {
  name: undefined,
};

export const getColumns = ({ renderCustom = () => null, renderOptTitle = () => null, renderOpt = () => null } = {}) => [
  ...[
    {
      title: 'name-test',
      dataIndex: 'name-test',
      width: 200,
      FC: InputFC,
    },
    {
      title: 'name-test-2',
      dataIndex: 'name-test-2',
      width: 200,
      FC: InputFC,
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: 400,
      FC: InputFC,
      autoFocus: true,
    },
  ].map((item) => {
    const { dataIndex, render = renderCustom, ...restItem } = item;
    return {
      ...restItem,
      dataIndex,
      key: dataIndex,
      render: (text, record, index) => render(item, text, record, index),
    };
  }),
  {
    title: renderOptTitle(),

    dataIndex: 'opt',
    key: 'opt',

    width: 400,
    render: renderOpt,
  },
];
