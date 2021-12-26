/*
 * @Author: kate.yang
 * @Date: 2021-09-25 18:23:20
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-09-25 22:22:01
 */

import React, { useState } from 'react';
import { Drawer, Button, Spin, Popover, Tooltip } from 'antd';

const Edit = ({ className = 'my-drawer', width = '50%', title = '配置抽屉' }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Popover
        overlayClassName="my-popover"
        title="title"
        content={<div>@Author: kate.yang * @Date: 2021-09-15 16:51:12</div>}
        placement="topLeft"
        trigger="click"
      >
        <Button type="primary">Popover test</Button>
      </Popover>
      <br />
      <br />
      <br />
      <Tooltip
        overlayClassName="my-tooltip"
        title="@Author: kate.yang * @Date: 2021-09-15 16:51:12"
        placement="topLeft"
        trigger="click"
      >
        <a>Tooltip test</a>
      </Tooltip>

      <br />
      <br />
      <br />
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <br />
      <br />
      <br />
      <Drawer
        className={className}
        width={width}
        title={title}
        visible={visible}
        //
        onClose={onClose}
        _footer={
          <>
            方式一
            <Button className="btn-item" disabled={false} onClick={onClose}>
              取消
            </Button>
            <Button type="primary" className="btn-item" loading={false} onClick={onClose}>
              确定
            </Button>
          </>
        }
      >
        <Spin spinning={true} />

        {/* <div style={{ height: 400 }}></div>
        <p>Some contents...</p>
        <div style={{ height: 600, background: 'pink', marginTop: 24 }}></div> */}

        <div className="my-drawer-footer">
          方式二
          <Button className="btn-item" disabled={false} onClick={onClose}>
            取消
          </Button>
          <Button type="primary" className="btn-item" loading={false} onClick={onClose}>
            确定
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default Edit;
