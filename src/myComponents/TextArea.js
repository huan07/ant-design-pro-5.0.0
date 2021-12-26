/*
 * @Author: kate.yang
 * @Date: 2021-09-15 01:06:41
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-09-19 18:28:52
 */

import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const PATT = /\<br\/\>/g; // todo 是否需要用字符串换行呢？

export const TextAreaFC = ({
  allowClear = true,
  autoSize = {
    minRows: 2,
  },

  label,
  placeholder,
  fcvalue: value,
  onChange = () => {},
  ...restProps
}) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <TextArea
      {...restProps}
      allowClear={allowClear}
      autoSize={autoSize}
      placeholder={placeholder || `请输入${label}`}
      value={value && typeof value === 'string' ? value.replace(PATT, '\n') : value}
      onChange={handleChange}
    />
  );
};
