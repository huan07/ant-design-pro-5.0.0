/*
 * @Author: kate.yang
 * @Date: 2021-09-21 17:09:14
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-09-21 19:44:52
 */

import React from 'react';
import { Table, Tooltip } from 'antd';

export const DEFAULT_PAGE_INDEX = 1;
export const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];
export const DEFAULT_PAGE_SIZE = +PAGE_SIZE_OPTIONS[0];

export const DEFAULT_SEARCH_PARAMS = {
  pageIndex: DEFAULT_PAGE_INDEX,
  pageSize: DEFAULT_PAGE_SIZE,
};

export const ELLIPSIS_COLUMN_CONFIG = {
  ellipsis: {
    showTitle: false,
  },
  render: (text) =>
    text ? (
      <Tooltip placement="topLeft" overlayClassName="long-word" title={text}>
        <span style={{ cursor: 'pointer' }}>{text}</span>
      </Tooltip>
    ) : (
      '--'
    ),
};

export const defaultRowKey = 'id';
export const getRowClassName = (_r, index) => (index % 2 === 1 ? 'row-odd' : 'row-even');
export const getPagination = ({
  total,
  pageIndex,
  pageSize,
  onChange,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  defaultPageSize = DEFAULT_PAGE_SIZE,
}) => ({
  total,
  current: pageIndex,
  pageSize,
  onChange,
  pageSizeOptions,
  defaultPageSize,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total, range) => `共 ${total} 条，当前显示 ${range[0]} - ${range[1]} 条`,
});

export const TableFC = ({
  size = 'small',
  className = 'my-small-table',

  columns = [],
  dataSource = [],

  total,
  pageIndex,
  pageSize,
  onChange = () => {},
  pagination = getPagination({
    total,
    pageIndex,
    pageSize,
    onChange,
  }),

  rowKey = defaultRowKey, // todo columns的每一项有key属性值，这个地方就不需要写上了
  rowClassName = getRowClassName, // todo 为啥取名为rowClassName不生效呢
  ...restProps // ( loading, scroll, expandable 等属性 )
}) => {
  return (
    <Table
      {...restProps}
      size={size}
      className={className}
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      rowKey={rowKey}
      rowClassName={rowClassName}
    />
  );
};
