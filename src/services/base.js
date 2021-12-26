/*
 * @Author: kate.yang
 * @Date: 2021-09-14 22:24:57
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-11-07 16:28:23
 */

import { message } from 'antd';
import { request } from 'umi';
import { isArray, stringify } from '@/myUtils';

export const SUCCESS_CODE = 200;

// todo ? 约定url默认以“/”结尾
export const baseApi = {
  async query(url, params = {}) {
    try {
      const { count, results, msg } = await request(`${url}?${stringify(params)}`, {
        method: 'GET',
      });
      if (isArray(results)) {
        return { dataSource: results, total: count };
      }
      message.warn(msg || '查询失败');
    } catch {
      message.warn('未知异常');
    }
  },
  // 新增后直接跳转到详情页面，接口需要返回id
  async addSubmitJump(url, params = {}) {
    try {
      const { code, results, msg } = await request(url, {
        method: 'POST',
        data: params,
      });
      if (code === SUCCESS_CODE) {
        return results?.id;
      }
      message.warn(msg || '提交失败');
    } catch {
      message.warn('未知异常');
    }
  },
  async addSubmit(url, params = {}) {
    try {
      const { code, msg } = await request(url, {
        method: 'POST',
        data: params,
      });
      if (code === SUCCESS_CODE) {
        return true;
      }
      message.warn(msg || '新增提交失败');
    } catch {
      message.warn('未知异常');
    }
  },
  async editSubmit(url, params = {}) {
    try {
      const { code, msg } = await request(`${url}${params.id || 0}/`, {
        method: 'PUT',
        data: params,
      });
      if (code === SUCCESS_CODE) {
        return true;
      }
      message.warn(msg || '编辑提交失败');
    } catch {
      message.warn('未知异常');
    }
  },
  async remove(url, params = {}) {
    try {
      const { code, msg } = await request(`${url}${params.id || 0}/`, {
        method: 'DELETE',
      });
      if (code === SUCCESS_CODE) {
        return true;
      }
      message.warn(msg || '删除失败');
    } catch {
      message.warn('未知异常');
    }
  },
};
