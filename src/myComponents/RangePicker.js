/*
 * @Author: kate.yang
 * @Date: 2021-09-15 00:29:21
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-09-20 03:11:45
 */

import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { DEFAULT_TIME_FORMAT, getLastMoment } from '@/myUtils/time';

const { RangePicker } = DatePicker;

const DEFAULT_TIME_RANGES = {
  今天: () => [moment().startOf('day'), moment().endOf('day')],
  昨天: () => [getLastMoment(1).startOf('day'), getLastMoment(1).endOf('day')],
  过去7天: () => [getLastMoment(6).startOf('day'), moment().endOf('day')],
  '1分钟': () => [getLastMoment(1, 'minutes'), moment()],
  '1小时': () => [getLastMoment(1, 'hours'), moment()],
  '1天': () => [getLastMoment(1), moment()],
};

export const RangePickerFC = ({
  allowClear = true,
  style = {
    width: '100%',
  },
  format = DEFAULT_TIME_FORMAT,
  ranges = DEFAULT_TIME_RANGES,

  label,
  placeholder = ['开始时间', '结束时间'],
  fcvalue: value = ['', ''],
  onChange = () => {},
}) => {
  const handleChange = (_dates, dateStrings) => {
    onChange(dateStrings);
  };

  return (
    <RangePicker
      allowClear={allowClear}
      style={style}
      format={format}
      ranges={ranges}
      placeholder={placeholder}
      value={value.map((item) => (item ? moment(item, format) : null))}
      onChange={handleChange}
    />
  );
};
