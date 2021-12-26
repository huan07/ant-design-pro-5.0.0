/*
 * @Author: kate.yang
 * @Date: 2021-09-20 22:37:53
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-10-03 19:33:09
 */

import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { waitTime } from '@/myUtils';
import Edit from './DemoModalWrap';

export default () => {
  const [editData, setEditData] = useState({});

  const handleEdit = (record = {}, isEdit = false) => {
    setEditData({ record, isEdit, visible: true });
  };

  const handleEditCancel = () => {
    setEditData(() => ({ ...editData, visible: false }));
  };

  const handleEditOk = async () => {
    handleEditCancel();
    await waitTime(); // todo 假装这里是一次查询吧
  };

  return (
    <>
      <a onClick={() => handleEdit()}>新增</a>
      &nbsp; &nbsp;
      <Tooltip title="编辑">
        <a
          onClick={() => {
            handleEdit({ name: '测试编辑默认值' }, true);
          }}
        >
          <EditOutlined />
          编辑 全屏对话框样式，看场景是否需要
        </a>
      </Tooltip>
      <Edit editData={editData} onOk={handleEditOk} onCancel={handleEditCancel} />
    </>
  );
};
