/*
 * @Author: kate.yang
 * @Date: 2021-09-16 22:37:19
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-09-20 02:11:44
 */

import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import { getArray, getObject } from '@/myUtils';

const { Option } = Select;

export const SelectFC = ({
  requestFun, // 请求函数
  requestParams, // 请求参数（ 值是{}注意要用useMemo处理下 ）
  options, // 接收到的options参数，与requestFun, requestParams是互斥的（ 值是[]注意要用useMemo处理下 ）
  optionValue = 'value',
  optionText = 'text', // 纯文本值用字符串？？
  optionNode = 'node', // 或者是自定义节点

  disabled = false,
  allClear = true,
  showArrow = true,
  showSearch = true,
  style = {
    width: '100%',
  },

  label,
  placeholder,
  fcvalue: value,
  onChange = () => {},
  ...restProps
}) => {
  // TODO 高亮关键字，文本值过长呢，防抖搜索
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    // 先判断是否有调用下拉框数据的函数
    // 其次从options取值
    // requestFun+requestParams 与 options是互斥的
    if (requestFun) {
      // console.log(label, requestParams, '调用接口', '');

      if (!requestParams) {
        setData([]);
        return;
      }
      (async () => {
        setLoading(true);
        setData([]); // 不写的话，如果接口返回较慢，会看到上一轮下拉框的数据，页面效果不好吧
        try {
          const resp = await requestFun(requestParams);
          setData(getArray(resp));
        } catch {}
        setLoading(false);
      })();
      return;
    }

    // console.log(label, options, '接收options', '');
    setData(getArray(options));
  }, [requestParams, options]);

  const handleChange = (value, option) => {
    // TODO 接收的第二个参数是 数组的一条对象
    onChange(value, getObject(option?.item));

    //console.log('handleChange', value, option, getObject(option?.item));
  };

  return (
    <Select
      {...restProps}
      disabled={disabled}
      allowClear={allClear}
      showArrow={showArrow}
      showSearch={showSearch}
      style={style}
      placeholder={placeholder || `请输入${label}`}
      optionFilterProp="text"
      filterOption={(input, option) => {
        // TODO 目前固定按文本过滤，不需要判断输入框input是否有值，因为没有值不会去执行函数，框架已经给你处理了
        // 因为如果用children，它可能是自定义节点，那怎么过滤
        // console.log('filterOption', input, option);

        return String(option.text).toLowerCase().includes(String(input).toLowerCase());
      }}
      notFoundContent={loading ? <Spin size="small" /> : null}
      value={value}
      onChange={handleChange}
    >
      {data.map((item) => {
        if (item) {
          const { [optionValue]: value, [optionText]: text, [optionNode]: node = null, disabled = false } = item;
          return (
            value !== undefined &&
            value !== null && (
              <Option key={value} disabled={disabled} value={value} text={text} item={item}>
                {node || text}
              </Option>
            )
          );
        }
      })}
    </Select>
  );
};
