/*
 * @Author: kate.yang
 * @Date: 2021-09-21 04:36:32
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-11-04 17:04:36
 */

import React, { useState } from 'react';
import { Table } from 'antd';
import { ELLIPSIS_COLUMN_CONFIG } from '@/myComponents/Table';
import DemoTableWrap from './DemoTableWrap';

export const getColumns = ({ renderOpt = () => null } = {}) => [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 100,
  },
  {
    title: '住址',
    dataIndex: 'address',
    // width: 300,
    className: 'long-word',
    ...ELLIPSIS_COLUMN_CONFIG,
  },
  {
    title: '操作',
    dataIndex: 'opt',
    width: 100,
    render: renderOpt,
  },
];

const expandedColumns = [
  {
    title: '姓名 + 年龄',
    dataIndex: 'name',
    key: 'name', // TODO 不写上的话，那么就需要写上 rowKey
    width: 191,
    render: (text, { age }) => (
      <span>
        {text}--{age}
      </span>
    ),
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address', //
    // width: 300,
    className: 'long-word',
  },
  {
    title: '操作',
    dataIndex: 'opt',
    key: 'opt', //
    width: 91,
  },
];

export const dataSourceMock = [
  {
    test_id: 1,
    name: '胡彦斌',
    age: 32,
    address:
      'http://localhost:8000/integrate-task/table, http://localhost:8000/integrate-task/table, http://localhost:8000/integrate-task/table, http://localhost:8000/integrate-task/table, http://localhost:8000/integrate-task/table',
  },
  {
    test_id: 2,
    name: '胡彦祖2',
    age: 42,
    address: '西湖区湖底公园2号',
  },
  {
    test_id: 3,
    name: '胡彦祖3',
    age: 52,
    address: '西湖区湖底公园3号',
  },
];
export const totalMock = 100; // 分页表格属性：数据库总条数

const Demo = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  return (
    <>
      <Table
        size="small"
        className="my-small-table"
        columns={getColumns({
          renderOpt: (_t, { test_id }) => {
            // 默认只展开一项
            return (
              <a
                onClick={() => {
                  setExpandedRowKeys(expandedRowKeys.includes(test_id) ? [] : [test_id]);
                }}
              >
                展开
              </a>
            );
          },
        })}
        dataSource={dataSourceMock}
        pagination={false}
        rowKey="test_id"
        expandable={{
          expandedRowRender: () => (
            <div className="my-expanded-row">
              <Table
                size="small"
                columns={expandedColumns}
                dataSource={dataSourceMock}
                pagination={false}
                rowKey="test_id"
              />
            </div>
          ),
          expandedRowKeys,
          expandIconColumnIndex: -1,
        }}
      />
      <br />
      <br />
      <br />
      <DemoTableWrap />
    </>
  );
};

export default Demo;
// TODO 不对齐呢
