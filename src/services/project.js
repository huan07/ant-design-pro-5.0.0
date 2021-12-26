/*
 * @Author: kate.yang
 * @Date: 2021-09-19 03:09:41
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-09-19 22:56:07
 */

import { request } from 'umi';
import { isObject, stringify } from '@/myUtils';
import { formatTime } from '@/myUtils/time';
import { SUCCESS_CODE } from './base';

// 查询应用
export const queryProjectSelectApi = async () => {
  try {
    const resp = await request('/api/project/');
    return resp.map((item) => ({ ...(item || {}), text: `${item?.name} (${item?.lang})` }));
  } catch {}
};

// 查询环境by应用
export const queryEnvByProjectApi = async (params = {}) => {
  try {
    const resp = await request(`/api/project/env/?${stringify(params)}`);
    if (isObject(resp)) {
      return Object.keys(resp).reduce((results, key) => results.concat(resp[key]), []);
    }
  } catch {}
};

// 查下应用分支by应用、环境
export const queryBranchApi = async (params = {}) => {
  try {
    const { status, data } = await request(`/api/project/branches/?${stringify(params)}`);
    if (status === SUCCESS_CODE) {
      return data.map((item) => {
        if (item) {
          const { name, commit } = item;
          const { committer_name, committed_date } = commit || {};
          return {
            ...item,
            text: `[分支名: ${name || ''} | 提交人: ${committer_name || ''} | 提交时间: ${formatTime(committed_date)}]`,
          };
        }
      });
    }
  } catch {}
};
