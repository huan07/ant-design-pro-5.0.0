/*
 * @Author: kate.yang
 * @Date: 2021-09-14 21:03:41
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-11-06 18:39:32
 */

import moment from 'moment';

export const DEFAULT_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const formatTime = (dateStr, formatStr = DEFAULT_TIME_FORMAT) =>
  dateStr && typeof dateStr === 'string' ? moment(dateStr).format(formatStr) : '--';

export const diffTime = (startTime, endTime, unit = 'seconds') =>
  startTime && endTime ? moment(endTime).diff(moment(startTime), unit, true) : '--';

// 时间差计算比moment更准?
export const diffTimeToToday = (utime = '') =>
  Math.floor((new Date().getTime() - new Date(String(utime || '')).getTime()) / 1000);

// 计算昨天
export const getLastMoment = (amount, unit = 'days') => moment().subtract(amount, unit);
