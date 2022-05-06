import { useState, FC } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import {
  BarChartOutlined,
  CloseOutlined,
  DashboardOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { neutralDarkPalette } from 'helpers';
import './MainLayout.scss';

const { Content, Sider } = Layout;

const MainLayout: FC = ({ children }) => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const currentPath =
    pathname
      .split('/')
      .filter((p) => p)
      .pop() ?? 'overview';

  const toggle = (collapseState: boolean): void => setCollapsed(collapseState);
  const iconStyle = { fontSize: '16px' };

  const menuItems: ItemType[] = [
    {
      key: 'overview',
      icon: <DashboardOutlined style={iconStyle} />,
      title: 'Overview',
      label: <Link to="/">Overview</Link>,
    },
    {
      key: 'outtages',
      icon: <BarChartOutlined style={iconStyle} />,
      title: 'Outtages',
      label: <Link to="/outtages">Outtages</Link>,
    },
  ];

  return (
    <Layout className="main-layout" hasSider>
      <Sider
        className="main-layout__sidebar"
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        defaultCollapsed
        onCollapse={toggle}
        style={{ backgroundColor: neutralDarkPalette?.[0] }}
        trigger={
          collapsed ? (
            <MenuOutlined style={iconStyle} />
          ) : (
            <CloseOutlined style={iconStyle} />
          )
        }
      >
        <Menu
          mode="inline"
          selectedKeys={[currentPath]}
          style={{ backgroundColor: neutralDarkPalette?.[0] }}
          items={menuItems}
          theme="dark"
        />
      </Sider>
      <Layout>
        <Content className="main-layout__content">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
