/*
 * @Author: kate.yang
 * @Date: 2021-09-15 19:42:44
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-09-20 17:18:34
 */

import React from 'react';
import { Form, Row, Col, Button } from 'antd';

const FormItem = Form.Item;

export const EDIT_FORM_LAYOUT = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

export const BUTTON_GROUP_LAYOUT = {
  wrapperCol: { offset: 4, span: 16 },
};

export const EditForm = ({
  formItemSpan = 24,
  formItemLayout = EDIT_FORM_LAYOUT,
  btnSpan = 24, // 有无提交、重置回调函数

  formItemsConfig = [],
  formData = {},
  onChange = () => {},

  onOk = () => {},
  onCancel = () => {},
  submitDisabled = false,
}) => {
  return (
    <Row>
      {formItemsConfig.map(
        ({
          label,
          field,
          FC,

          value = formData[field], // TODO 取默认值，是否从原型链查找呢？
          callback = (value, item) => {
            // item用在下拉框选中，传递一条对象
            onChange({ [field]: value }, item);
          },

          span = formItemSpan,
          required,
          help,
          layout = formItemLayout,

          ...restConfig
        }) =>
          FC && (
            <Col key={field} span={span}>
              <FormItem label={label} required={required} help={help} {...layout}>
                <FC {...restConfig} label={label} fcvalue={value} onChange={callback} />
              </FormItem>
            </Col>
          )
      )}
      <Col span={btnSpan}>
        <FormItem {...BUTTON_GROUP_LAYOUT}>
          <Button type="primary" className="btn-item" loading={submitDisabled} onClick={onOk}>
            提交
          </Button>
          <Button className="btn-item" disabled={submitDisabled} onClick={onCancel}>
            重置
          </Button>
        </FormItem>
      </Col>
    </Row>
  );
};
