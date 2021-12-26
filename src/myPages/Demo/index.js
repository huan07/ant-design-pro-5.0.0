/*
 * @Author: kate.yang
 * @Date: 2021-09-15 16:51:12
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-11-17 19:26:05
 */

import React, { useState, useEffect } from 'react';
import { SearchForm, SelectFC, SelectOptGroupFC, InputFC, RangePickerFC, RadioFC } from '@/myComponents';
import { waitTime } from '@/myUtils';
import { queryProjectSelectApi, queryEnvByProjectApi } from '@/services/project';

const IntegrateTaskList = () => {
  const [searchParams, setSearchParams] = useState({});
  const [queryLoading, setQueryLoading] = useState(false);

  const [projectList, setProjectList] = useState([]);
  const [envList, setEnvList] = useState([]);

  const { t } = searchParams; // ! 查询参数最好一一枚举出来，方便迭代

  useEffect(() => {
    (async () => {
      const [projectList, envList] = await Promise.all([queryProjectSelectApi(), queryEnvByProjectApi()]);
      setProjectList(projectList);
      setEnvList(envList);
    })();
  }, []);

  const handleSearch = async () => {
    setQueryLoading(true);
    console.log(searchParams, 'searchParams searching......');
    await waitTime();
    setQueryLoading(false);
  };

  const handleReset = () => {
    // ! 分页参数不变、表单参数清空即可
    setSearchParams({});
  };

  const handleChange = (updatedValues) => {
    setSearchParams((prevState) => ({ ...prevState, ...updatedValues }));
  };

  const formItemsConfig = [
    {
      label: 'ID',
      placeholder: '请输入任务ID，支持回车后查询',
      field: 'id',
      FC: InputFC,

      onPressEnter: handleSearch,
    },

    {
      label: 'project_id',
      field: 'project_id',
      FC: SelectFC,

      options: projectList,

      optionValue: 'id',
    },

    {
      label: 'env',
      field: 'env',
      FC: SelectOptGroupFC,

      options: envList,

      optionValue: 'env',
      optionText: 'title',
      labelName: 'as',
      optionsName: 'list',
    },

    {
      label: 'type',
      field: 'type',
      FC: RadioFC,
      options: [
        {
          value: '1',
          text: '1',
        },
        {
          value: '2',
          text: '2',
        },
      ],
    },

    {
      label: '时间范围',
      field: 'dateTime',

      span: 16,
      layout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 21 },
      },

      FC: RangePickerFC,

      value: [searchParams.startTime, searchParams.endTime],
      callback: ([startTime, endTime]) => handleChange({ startTime, endTime }),
    },
  ];

  console.log(searchParams, 'searchParams');

  return (
    <section className="my-wrapper">
      <SearchForm
        formItemsConfig={formItemsConfig}
        formData={searchParams}
        onChange={handleChange}
        //
        onSearch={handleSearch}
        onReset={handleReset}
        queryLoading={queryLoading}
      />
      <div className="my-content-wrapper">test</div>
    </section>
  );
};

export default IntegrateTaskList;
