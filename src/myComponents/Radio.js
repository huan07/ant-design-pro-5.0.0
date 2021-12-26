/*
 * @Author: kate.yang
 * @Date: 2021-09-19 02:43:00
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-09-19 02:52:46
 */

import React from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

export const RadioFC = ({
  options = [],
  optionValue = 'value',
  optionText = 'text',

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
    <RadioGroup {...restProps} value={value} onChange={handleChange}>
      {options.map((item) => {
        if (item) {
          const { [optionValue]: value, [optionText]: text } = item;
          return (
            <Radio key={value} value={value}>
              {text}
            </Radio>
          );
        }
      })}
    </RadioGroup>
  );
};
