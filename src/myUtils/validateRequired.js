/*
 * @Author: kate.yang
 * @Date: 2021-09-14 21:02:55
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-09-17 02:01:07
 */

import { message } from 'antd';

export default function (formItemsConfig = [], formData = {}) {
  let flag = true;
  for (let item of formItemsConfig) {
    const { label, field, required } = item;
    if (required) {
      const value = formData[field];
      if (
        value === undefined ||
        value === null ||
        value === '' ||
        (typeof value === 'string' && value.trim() === '') ||
        (Array.isArray(value) && value.length === 0)
      ) {
        message.warning(`「${label}」不能为空`);
        flag = false;
        return;
      }
    }
  }
  return flag;
}
