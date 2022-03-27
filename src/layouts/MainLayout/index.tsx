import { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  CloseOutlined,
  DashboardOutlined,
  MenuOutlined,
} from '@ant-design/icons';

import './MainLayout.scss';

const { Content, Sider } = Layout;
const { Item } = Menu;

const MainLayout: FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const toggle = (collapseState: boolean): void => setCollapsed(collapseState);
  const iconStyle = { fontSize: '16px' };

  return (
    <Layout className="main-layout" hasSider>
      <Sider
        className="main-layout__sidebar"
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        defaultCollapsed
        onCollapse={toggle}
        trigger={
          collapsed ? (
            <MenuOutlined style={iconStyle} />
          ) : (
            <CloseOutlined style={iconStyle} />
          )
        }
      >
        <Menu defaultSelectedKeys={['overview']} mode="inline" theme="dark">
          <Item
            icon={<DashboardOutlined style={iconStyle} />}
            key="overview"
            title="Overview"
          >
            <Link to="/">Overview</Link>
          </Item>
        </Menu>
      </Sider>
      <Layout>
        <Content className="main-layout__content">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
