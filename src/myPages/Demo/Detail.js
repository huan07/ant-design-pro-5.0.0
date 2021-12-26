/*
 * @Author: kate.yang
 * @Date: 2021-09-15 16:51:12
 * @Last Modified by: kate.yang
 * @Last Modified time: 2021-11-17 19:33:53
 */

import { history, Link } from 'umi';
import { PageHeader, Button, Descriptions } from 'antd';

const DescriptionsItem = Descriptions.Item;

const IntegrateTaskDetail = () => {
  return (
    <section className="my-wrapper">
      <PageHeader
        className="my-header-wrapper"
        onBack={() => window.history.back()}
        title="Title"
        subTitle="This is a subtitle"
        extra={[
          <Button
            key="3"
            onClick={() => {
              history.push('/integrate-task/list');
            }}
          >
            列表页面
          </Button>,
          <Button key="1" type="primary">
            Primary
          </Button>,
        ]}
      >
        <Descriptions size="small" column={4}>
          <DescriptionsItem label="Created">Lili Qu</DescriptionsItem>

          <DescriptionsItem label="Association">
            <Link to="/integrate-task/edit">编辑页面</Link>
          </DescriptionsItem>

          <DescriptionsItem label="Creation Time">2017-01-10</DescriptionsItem>
          <DescriptionsItem label="Effective Time">2017-10-10</DescriptionsItem>

          <DescriptionsItem label="Remarks" span={2}>
            Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
          </DescriptionsItem>
          <DescriptionsItem label="Remarks-2" span={2}>
            Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
          </DescriptionsItem>

          <DescriptionsItem label="Effective Time">
            为啥不是放在PageHeader组件内部？？... 为啥不是放在PageHeader组件内部？？...
            为啥不是放在PageHeader组件内部？？
          </DescriptionsItem>
        </Descriptions>
      </PageHeader>
      <div className="my-content-wrapper">为啥不是放在PageHeader组件内部 </div>
    </section>
  );
};

export default IntegrateTaskDetail;
