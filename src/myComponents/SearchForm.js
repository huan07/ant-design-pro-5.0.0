/*
 * @Author: kate.yang
 * @Date: 2021-09-15 19:42:44
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-09-20 04:31:32
 */

import React from 'react';
import { Form, Row, Col, Button } from 'antd';

const FormItem = Form.Item;

export const SEARCH_FORM_LAYOUT = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export const BUTTON_GROUP_LAYOUT = {
  wrapperCol: { offset: 6, span: 18 },
};

export const SearchForm = ({
  className = 'my-form-wrapper', // 或者用 my-form-wrapper- 测试下
  formItemClassName = 'my-form-item', // 或者用 my-form-item- 测试下，不需要用的className

  formItemSpan = 8,
  formItemLayout = SEARCH_FORM_LAYOUT,
  btnSpan = 8,

  formItemsConfig = [],
  formData = {},
  onChange = () => {},

  onSearch = () => {},
  onReset = () => {},
  queryLoading = false,
  children,
}) => {
  return (
    <Row className={className}>
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
          // help, // 不需要
          layout = formItemLayout,

          ...restConfig
        }) =>
          FC && (
            <Col key={field} span={span}>
              <FormItem className={formItemClassName} label={label} required={required} {...layout}>
                <FC {...restConfig} label={label} fcvalue={value} onChange={callback} />
              </FormItem>
            </Col>
          )
      )}
      <Col span={btnSpan}>
        <FormItem className={formItemClassName} style={{ textAlign: 'right' }} {...BUTTON_GROUP_LAYOUT}>
          <Button type="primary" className="btn-item" loading={queryLoading} onClick={onSearch}>
            查询
          </Button>
          <Button className="btn-item" disabled={queryLoading} onClick={onReset}>
            重置
          </Button>
          {children}
        </FormItem>
      </Col>
    </Row>
  );
};
