/*
 * @Author: kate.yang
 * @Date: 2021-09-14 21:03:27
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-11-06 17:27:44
 */

export const getMapping = (data, propName = 'value') =>
  data.reduce((mapping, item) => {
    if (item) {
      mapping[item[propName]] = item;
    }
    return mapping;
  }, {});

export const getValueTextMapping = (data, valueName = 'value', textName = 'text', initialMapping = {}) => {
  return data.reduce((mapping, item) => {
    if (item) {
      mapping[item[valueName]] = item[textName];
    }
    return mapping;
  }, initialMapping);
};
