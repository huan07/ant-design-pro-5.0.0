/*
 * @Author: kate.yang
 * @Date: 2021-09-15 16:51:12
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-11-17 19:30:17
 */

import React, { useState, useMemo } from 'react';
import { EditForm, SelectFC, SelectOptGroupFC, TextAreaFC } from '@/myComponents';
import { waitTime } from '@/myUtils';
import { queryProjectSelectApi, queryEnvByProjectApi, queryBranchApi } from '@/services/project';

const IntegrateTaskEdit = () => {
  const [editParams, setEditParams] = useState({});
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const { project_id, env, description } = editParams; // ! 提交参数最好一一枚举出来，方便迭代

  const handleEditOk = async () => {
    setSubmitDisabled(true);
    console.log(editParams, 'editParams submitting......');
    await waitTime();
    setSubmitDisabled(false);
  };

  const handleEditCancel = () => {
    setEditParams({});
  };

  const handleChange = (updatedValues) => {
    setEditParams((prevState) => ({ ...prevState, ...updatedValues }));
  };

  const formItemsConfig = [
    {
      label: 'project_id',
      field: 'project_id',
      required: true,
      FC: SelectFC,

      requestFun: queryProjectSelectApi,
      requestParams: useMemo(() => ({}), []),

      optionValue: 'id',
      callback: (project_id) => {
        // ! 联动处理
        setEditParams({ project_id });
      },
    },

    {
      label: 'env',
      field: 'env',
      required: true,
      FC: SelectOptGroupFC,

      disabled: !project_id,
      requestFun: queryEnvByProjectApi,
      requestParams: useMemo(() => (project_id ? { project_id } : undefined), [project_id]),

      optionValue: 'env',
      optionText: 'title',
      labelName: 'as',
      optionsName: 'list',
      callback: (env) => {
        // ! 联动处理
        handleChange({
          env,
          branches: undefined,
          commitid: undefined,
          description: undefined,
        });
      },
    },

    {
      label: 'branches',
      field: 'branches',
      required: true,
      FC: SelectFC,

      disabled: !project_id || !env,
      requestFun: queryBranchApi,
      requestParams: useMemo(() => (project_id && env ? { project_id, env } : undefined), [project_id, env]),

      optionValue: 'name',
      callback: (branches, { commit }) => {
        handleChange({
          branches,
          commitid: commit?.short_id,
          description: commit?.message,
        });
      },
    },

    {
      label: 'description',
      field: 'description',
      FC: TextAreaFC,
    },
  ];

  console.log(editParams, 'editParams');

  return (
    <section className="my-section">
      <EditForm
        formItemsConfig={formItemsConfig}
        formData={editParams}
        onChange={handleChange}
        //
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        submitDisabled={submitDisabled}
      />
    </section>
  );
};

export default IntegrateTaskEdit;
