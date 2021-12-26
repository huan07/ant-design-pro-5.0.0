/*
 * @Author: kate.yang
 * @Date: 2021-09-14 21:02:55
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-11-06 18:40:10
 */

import validateRequired from './validateRequired';

export const isArray = (data) => Array.isArray(data);
export const isObject = (data) => Object.prototype.toString.call(data) === '[object Object]';

export const getArray = (data) => (isArray(data) ? data : []);
export const getObject = (data) => (isObject(data) ? data : {});

const getParams = (str = 'foo=bar&baz=qux') => {
  const params = new URLSearchParams(str);
  const result = Object.fromEntries(params);
  console.log('getParams() =>', params, result);
  return result;
};

getParams();

// todo ? 是否需要加前面加上? 否则每次多需要手动写上?
const stringify = (params = { foo: 'bar', baz: 'qux' }) => {
  const result = Object.keys(params)
    .reduce((results, name) => {
      const value = params[name];
      // todo undefined 需要放判断条件吗？
      if (value !== undefined && value !== null && value !== '') {
        results.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
      }
      return results;
    }, [])
    .join('&');
  console.log('stringify() => ', result);
  return result;
};

stringify();

function waitTime(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export { validateRequired, stringify, waitTime };
