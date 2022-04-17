import { useState, FC } from 'react';
import { useLocation, Link } from 'react-router-dom';
import style from 'styled-components';
import { Layout, Menu, MenuItemProps } from 'antd';
import {
  BarChartOutlined,
  CloseOutlined,
  DashboardOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { neutralDarkPalette } from 'helpers';
import './MainLayout.scss';

const { Content, Sider } = Layout;
const StyledItem: FC<MenuItemProps> = style(Menu.Item)`
  &:hover {
    background-color: ${neutralDarkPalette?.[1]} !important;
  }
  &.ant-menu-item-selected:hover {
    background-color: var(--ant-primary-color-hover) !important;
  }
`;

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
          theme="dark"
        >
          <StyledItem
            icon={<DashboardOutlined style={iconStyle} />}
            key="overview"
            title="Overview"
          >
            <Link to="/">Overview</Link>
          </StyledItem>
          <StyledItem
            icon={<BarChartOutlined style={iconStyle} />}
            key="outtages"
            title="Outtages"
          >
            <Link to="/outtages">Outtages</Link>
          </StyledItem>
        </Menu>
      </Sider>
      <Layout>
        <Content className="main-layout__content">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
