/*
 * @Author: kate.yang
 * @Date: 2021-09-15 16:51:12
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-09-28 00:54:01
 */

import React, { useState, useEffect } from 'react';
import { EditForm, InputFC } from '@/myComponents';
import { validateRequired } from '@/myUtils';
import { API } from '@/services/demoTreeCRUD';
import { PAGE_NAME } from './config';

const Edit = ({
  title = PAGE_NAME,
  idNameMapping = {},
  editData: { record = {}, record: { parent_id, id } = {}, isEdit = false, visible = false },
  onOk = () => {},
  onCancel = () => {},
}) => {
  const [editRecord, setEditRecord] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);

  const fullTitle = `${isEdit ? '编辑' : '新增'}「${title}」`;
  const { name } = editRecord;

  useEffect(() => {
    // 正在提交的过程中，左侧树节点最好别更新
    // 新增默认取值 当前节点id作为父节点parent_id
    !confirmLoading && setEditRecord(visible ? record : {});
  }, [id, visible]); // id或者visible（对应切换节点、提交数据）触发更新数据

  const handleOk = async () => {
    try {
      if (!validateRequired(formItemsConfig, editRecord)) {
        return;
      }
      setConfirmLoading(true);
      const submittedResp = await API.submit(
        {
          name,
          parent_id,
          id,
        },
        fullTitle
      );
      setConfirmLoading(false);
      submittedResp && (await onOk());
    } catch {}
  };

  const handleChange = (updatedValues) => {
    setEditRecord((prevState) => ({ ...prevState, ...updatedValues }));
  };

  const formItemsConfig = [
    {
      label: '名称',
      field: 'name',
      required: true,
      FC: InputFC,
    },
    {
      label: '父级菜单',
      field: 'parent_id',
      FC: () => <>{idNameMapping[parent_id]}</>,
    },
  ];

  return (
    <EditForm
      formItemsConfig={formItemsConfig}
      formData={editRecord}
      onChange={handleChange}
      onOk={handleOk}
      onCancel={onCancel}
      submitDisabled={confirmLoading}
    />
  );
};

export default Edit;
