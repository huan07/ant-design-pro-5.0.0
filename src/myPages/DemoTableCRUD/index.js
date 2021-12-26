/*
 * @Author: kate.yang
 * @Date: 2021-09-21 04:36:32
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-10-14 14:50:55
 */

import React, { useEffect, useState } from 'react';
import { Divider, Popconfirm, Tooltip } from 'antd';
import {
  PlusCircleOutlined,
  EditOutlined,
  MinusCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import { TableFC } from '@/myComponents/Table';
import { API } from '@/services/demoTreeCRUD';
import { DEFAULT_EDIT_RECORD, getColumns } from './config';

export default () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [editRecord, setEditRecord] = useState({});

  const { isEditing = false, cachedEditRecord = {} } = editRecord;

  useEffect(() => {
    (async () => {
      await query();
    })();
  }, []);

  const query = async () => {
    setLoading(true);
    const resp = await API.query();
    setLoading(false);
    setData(resp?.dataSource || []);
  };

  const clearEditRecord = () => setEditRecord({});

  const handleChange = (id, updatedValues) => {
    setData(
      data.map((item) => {
        if (item?.id === id) {
          return { ...item, ...updatedValues };
        }
        return item;
      })
    );
  };

  const handleFilter = (index) => {
    setData(data.filter((_i, _index) => _index !== index));
  };

  const handleAdd = (index) => {
    const _data = [...data];
    _data.splice(index, 0, { ...DEFAULT_EDIT_RECORD, isRecordEditing: true });
    setData(_data);

    setEditRecord({
      isEditing: true,
      cachedEditRecord: {},
    });
  };

  const handleEdit = (record) => {
    handleChange(record.id, { isRecordEditing: true });
    setEditRecord({
      isEditing: true,
      cachedEditRecord: record,
    });
  };

  const handleEditCancel = ({ id }, index) => {
    if (id === undefined) {
      handleFilter(index);
    } else {
      handleChange(id, { ...cachedEditRecord, isRecordEditing: false });
    }
    clearEditRecord();
  };

  const handleEditOk = async (record) => {
    try {
      setLoading(true);
      const { isRecordEditing, ...restRecord } = record;
      const submittedResp = await API.submit(restRecord, '提示 todo');
      if (!submittedResp) {
        setLoading(false);
        return;
      }
      await query();
      clearEditRecord();
    } catch {
      clearEditRecord();
    }
  };

  const handleRemove = async (record, index) => {
    try {
      setLoading(true);
      const removed = await API.remove(record);
      setLoading(false);
      removed && handleFilter(index);
    } catch {}
  };

  console.log(editRecord, 'render before => ');

  return (
    <TableFC
      className="my-small-edit-table"
      columns={getColumns({
        renderCustom: ({ title, dataIndex, width, FC, renderFC, ...restProps }, text, record) => {
          const { isRecordEditing = false, id } = record;
          return isRecordEditing ? (
            <FC
              {...restProps}
              label={title}
              fcvalue={text}
              onChange={(value) => handleChange(id, { [dataIndex]: value })}
            />
          ) : (
            <>{renderFC ? renderFC(text, record) : text}</>
          );
        },
        renderOptTitle: () => (
          <>
            操作&nbsp;&nbsp;
            {!isEditing && (
              <Tooltip title="新增行">
                <a onClick={() => handleAdd(data.length)}>
                  <PlusCircleOutlined />
                </a>
              </Tooltip>
            )}
          </>
        ),
        renderOpt: (_t, record, index) => {
          if (!isEditing) {
            return (
              <div className="editable-btns">
                <Tooltip title="编辑行">
                  <a onClick={() => handleEdit(record)}>
                    <EditOutlined />
                  </a>
                </Tooltip>
                <Divider type="vertical" />

                <Popconfirm size="small" title="确定删除行" onConfirm={() => handleRemove(record, index)}>
                  <MinusCircleOutlined className="red-color" />
                </Popconfirm>
                <Divider type="vertical" />

                <Tooltip title="向上新增一行">
                  <a onClick={() => handleAdd(index)}>
                    <ArrowUpOutlined />
                  </a>
                </Tooltip>
                <Divider type="vertical" />

                <Tooltip title="向下新增一行">
                  <a onClick={() => handleAdd(index + 1)}>
                    <ArrowDownOutlined />
                  </a>
                </Tooltip>
              </div>
            );
          }
          if (record.isRecordEditing) {
            return (
              <>
                <a onClick={() => handleEditOk(record)}>确定</a>
                <Divider type="vertical" />
                <a onClick={() => handleEditCancel(record, index)}>取消</a>
              </>
            );
          }
          return <div className="editable-btns" />;
        },
      })}
      dataSource={data}
      pagination={false}
      rowKey="id"
      loading={loading}
    />
  );
};
