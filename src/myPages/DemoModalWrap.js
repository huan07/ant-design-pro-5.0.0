import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { InputFC } from '@/myComponents';
import { waitTime } from '@/myUtils';

const Edit = ({
  width = '60%',
  title = '配置对话框',
  okText = '确定',

  editData: { record = {}, isEdit = false, visible = false },
  onOk = () => {},
  onCancel = () => {},
}) => {
  const [editRecord, setEditRecord] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [wrapClassName, setWrapClassName] = useState('');

  const fullTitle = `${isEdit ? '编辑' : '新增'}「${title}」`;

  useEffect(() => {
    if (!visible) {
      return;
    }

    setConfirmLoading(false);
    setWrapClassName(isEdit ? 'my-full-modal' : 'my-modal'); // todo 测试全屏对话框样式，看场景是否需要

    if (isEdit) {
      // todo 1.调用借口取值方式
      setEditRecord(record);
      return;
    }
    setEditRecord(record);

    // setEditRecord(record); // todo 2.直接从props取值，不需要区分编辑、新增
  }, [visible]);

  const handleOk = async () => {
    // 必填校验成功后执行
    setConfirmLoading(true);
    await waitTime(); // todo 假装这里是提交接口调用
    setConfirmLoading(false);
    await onOk(); // todo 成功后后关闭对话框、查询列表，否则不要去执行，保持原样！！！
  };

  const handleChange = (updatedValues) => {
    setEditRecord((prevState) => ({ ...prevState, ...updatedValues }));
  };

  return (
    <Modal
      wrapClassName={wrapClassName}
      width={width}
      title={fullTitle}
      visible={visible}
      //
      okText={okText}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
    >
      <div style={{ height: 400 }}></div>

      <InputFC
        label="测试名称"
        fcvalue={editRecord.name}
        onChange={(name) => {
          handleChange({ name });
        }}
      />

      <div style={{ height: 600, background: 'pink', marginTop: 24 }}></div>
    </Modal>
  );
};

export default Edit;
