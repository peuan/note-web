import { Breadcrumb, Layout as AntLayout, Menu } from "antd";
import { useState } from "react";
import { path } from "../route";
import { useHistory } from "react-router-dom";
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons";

const { Sider, Header, Footer, Content } = AntLayout;
const { SubMenu } = Menu;

const Layout = ({ children }) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const onClickSidePanel = ({ key }) => {
    console.log(key);
    history.push(key);
  };

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          onClick={(e) => onClickSidePanel(e)}
        >
          <Menu.Item key={path.note} icon={<PieChartOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item
            key={path.about}
            icon={<DesktopOutlined />}
            onClick={(e) => onClickSidePanel(e)}
          >
            About
          </Menu.Item>
          {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu> */}
          {/* <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu> */}
          <Menu.Item
            key={path.register}
            icon={<FileOutlined />}
            onClick={(e) => onClickSidePanel(e)}
          >
            Register
          </Menu.Item>
        </Menu>
      </Sider>
      <AntLayout className="site-layout">
        <Header />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 40, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
