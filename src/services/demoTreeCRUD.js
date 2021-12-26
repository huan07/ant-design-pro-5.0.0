/*
 * @Author: kate.yang
 * @Date: 2021-09-26 22:40:09
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-09-26 23:14:03
 */

import { message } from 'antd';
import { request } from 'umi';
import { baseApi } from './base';
import { waitTime } from '@/myUtils';

export const API = {
  async query(params = {}) {
    try {
      await waitTime();
      return await baseApi.query('/api/config/menu/', params);
    } catch {}
  },
  async submit(params = {}, fullTitle = '新增「菜单配置」') {
    const { id, ...restParams } = params;
    const [requestUrl, requestMethod] =
      id === undefined ? ['/api/config/menu/', 'POST'] : [`/api/config/menu/${id}/`, 'PATCH'];
    try {
      const resp = await request(requestUrl, { method: requestMethod, data: restParams });
      if (resp && resp.hasOwnProperty('id')) {
        message.success(resp.msg || `${fullTitle}成功`);
        return resp;
      }
      message.warn(resp?.msg || `${fullTitle}失败`);
    } catch {
      message.warn(`${fullTitle}失败，未知异常`);
    }
  },
  async remove(params = {}) {
    try {
      const resp = await request('/api/config/menu/', { method: 'DELETE', data: params });
      message.success(resp?.msg || `删除「菜单配置」成功`);
      return true; // todo 先这么写，因为不知道删除接口失败的返回格式
    } catch {
      message.warn('删除「菜单配置」失败，未知异常');
    }
  },
};
