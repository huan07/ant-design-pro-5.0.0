/*
 * @Author: kate.yang
 * @Date: 2021-09-15 01:22:03
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-09-19 02:59:08
 */

import React from 'react';
import { Input } from 'antd';

export const InputFC = ({
  allowClear = true,

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
    <Input
      {...restProps}
      allowClear={allowClear}
      placeholder={placeholder || `请输入${label}`}
      value={value}
      onChange={handleChange}
    />
  );
};
