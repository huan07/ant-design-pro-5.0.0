import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { DEFAULT_SEARCH_PARAMS, TableFC } from '@/myComponents/Table';
import { waitTime } from '@/myUtils';
import { getColumns, dataSourceMock, totalMock } from './DemoTable';

const Demo = () => {
  // TODO 可以不在这里写上 DEFAULT_SEARCH_PARAMS ，但是需要初始设置下
  // 如果在这里写上 DEFAULT_SEARCH_PARAMS 后，就不需要在初次查询的时候传参数
  const [searchParams, setSearchParams] = useState({});
  const [data, setData] = useState({});

  const { pageIndex, pageSize } = searchParams;
  const { loading = false, dataSource = [], total = 0 } = data;

  useEffect(() => {
    (async () => {
      await query(DEFAULT_SEARCH_PARAMS);
    })();
  }, []);

  const query = async ({ pageIndex = DEFAULT_SEARCH_PARAMS.pageIndex, pageSize = searchParams.pageSize } = {}) => {
    console.log('pageIndex, pageSize => ', pageIndex, pageSize);
    handleSearchFormChange({ pageIndex, pageSize });

    setData((prevState) => ({ ...prevState, loading: true }));
    await waitTime();
    setData({ loading: false, dataSource: dataSourceMock, total: totalMock });
  };

  const handleSearchFormChange = (updatedValues) => {
    setSearchParams((prevState) => ({ ...prevState, ...updatedValues }));
  };

  const handleReset = () => {
    // todo 分页参数不变（否则的话，页码会改变）、表单参数清空即可
    setSearchParams({ pageIndex, pageSize });
  };

  const handleSearch = () => {
    query();
  };

  const handlePageChange = (pageIndex, pageSize) => {
    query({ pageIndex, pageSize });
  };

  return (
    <>
      <Button type="primary" onClick={handleSearch}>
        查询测试，要从第一页开始查询呢
      </Button>
      &nbsp; &nbsp; &nbsp;
      <Button onClick={handleReset}>重置测试</Button>
      &nbsp; &nbsp; &nbsp;
      <span className="red-color">查询 分页参数设置</span>
      <br />
      <br />
      <TableFC
        columns={getColumns()}
        dataSource={dataSource}
        total={total}
        pageIndex={pageIndex}
        pageSize={pageSize}
        onChange={handlePageChange}
        rowKey="test_id"
        loading={loading}
      />
    </>
  );
};

export default Demo;
