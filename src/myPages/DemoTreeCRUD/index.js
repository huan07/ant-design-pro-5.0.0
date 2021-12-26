/*
 * @Author: kate.yang
 * @Date: 2021-09-15 16:51:12
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-09-30 02:46:12
 */

import React, { useState, useEffect } from 'react';
import { Tree, Input, Tooltip, Popconfirm, Spin } from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { getValueTextMapping } from '@/myUtils/getMapping';
import { API } from '@/services/demoTreeCRUD';
import { PAGE_NAME } from './config';
import Edit from './Edit';

const { Search } = Input;

const ROOT_MENU_NODE = {
  parent_id: -1,
  id: 0,
  name: '根节点',
};
const getTreeData = (data, id = ROOT_MENU_NODE.parent_id) =>
  data
    .filter((item) => item?.parent_id === id)
    .map((item) => ({
      ...item,
      children: getTreeData(data, item.id), // todo 最好在剩余的data过滤，性能会好吧
    }));

const MenuConfigList = () => {
  const [loading, setLoading] = useState(false);
  const [flatData, setFlatData] = useState([]);

  const [treeData, setTreeData] = useState([ROOT_MENU_NODE]);
  const [idNameMapping, setIdNameMapping] = useState({});

  const [searchValue, setSearchValue] = useState('');
  const [expandedKeys, setExpandedKeys] = useState([ROOT_MENU_NODE.id]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const [editData, setEditData] = useState({});

  useEffect(() => {
    (async () => {
      await query();
    })();
  }, []);

  useEffect(() => {
    setTreeData(getTreeData(flatData));
    setIdNameMapping(getValueTextMapping(flatData, 'id', 'name'));
  }, [flatData]);

  const query = async () => {
    setLoading(true);
    const resp = await API.query();
    setLoading(false);
    setFlatData([ROOT_MENU_NODE].concat(resp?.dataSource || []));
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const filteredData = value
      ? flatData.filter((item) =>
          String(item?.name || '')
            .toLowerCase()
            .includes(value.toLowerCase())
        )
      : [];

    setSearchValue(value || '');
    setExpandedKeys([ROOT_MENU_NODE.id].concat(filteredData.map((item) => item?.parent_id)));
    setAutoExpandParent(true);
  };

  const handleExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const handleEdit = (record = {}, isEdit = false) => {
    setEditData({ record, isEdit, visible: true });
  };

  const handleEditCancel = () => {
    setEditData(() => ({ ...editData, visible: false }));
  };

  const handleEditOk = async () => {
    handleEditCancel();
    await query();
  };

  const handleRemove = async ({ id }) => {
    try {
      const removed = await API.remove({ id });
      if (removed) {
        editData.record?.id === id && handleEditCancel(); // 删除的节点处于编辑状态，那么右侧表单数据清空
        await query();
      }
    } catch {}
  };

  const loop = (data) =>
    data.map((item) => {
      const { id: key, name: title, children = [] } = item;
      if (key === undefined || key === null || !title) {
        return null;
      }

      const index = title.indexOf(searchValue);
      const redTitle =
        index > -1 ? (
          <>
            {title.substr(0, index)}
            <span className="red-color">{searchValue}</span>
            {title.substr(index + searchValue.length)}
          </>
        ) : (
          title
        );
      return {
        item,
        key,
        title: (
          <>
            {redTitle}
            <Tooltip title="新增">
              <a
                className="tree-title-item"
                onClick={() => {
                  handleExpand([...expandedKeys, key]); // 对应的子节点要打开
                  handleEdit({ parent_id: key });
                }}
              >
                <PlusOutlined />
              </a>
            </Tooltip>

            {key === ROOT_MENU_NODE.id ? null : (
              <>
                <Tooltip title="编辑">
                  <a className="tree-title-item" onClick={() => handleEdit(item, true)}>
                    <EditOutlined />
                  </a>
                </Tooltip>

                <Popconfirm size="small" title={`确定删除此「${PAGE_NAME}」吗？`} onConfirm={() => handleRemove(item)}>
                  <DeleteOutlined className="tree-title-item red-color" />
                </Popconfirm>
              </>
            )}
          </>
        ),
        children: loop(children),
      };
    });

  return (
    <section className="my-box">
      <div className="my-left-box">
        <section className="my-container">
          <Search allowClear className="my-top-container" placeholder="请输入关键字" onChange={handleChange} />
          <div className="my-bottom-container">
            <Spin spinning={loading}>
              <Tree
                selectable={false}
                onExpand={handleExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                treeData={loop(treeData)}
              />
            </Spin>
          </div>
        </section>
      </div>
      <div className="my-right-box">
        <Edit idNameMapping={idNameMapping} editData={editData} onOk={handleEditOk} onCancel={handleEditCancel} />
      </div>
    </section>
  );
};

export default MenuConfigList;
