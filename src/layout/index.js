import { Layout as AntLayout, Menu } from "antd";
import { useContext, useState } from "react";
import { path } from "../route";
import { useHistory } from "react-router-dom";
import {
  PieChartOutlined,
  DesktopOutlined,
  FileOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../contexts";
import SubMenu from "antd/lib/menu/SubMenu";
import { replaceUrl } from "../utils";

const { Sider, Header, Content } = AntLayout;

const Layout = ({ children, selectedKey }) => {
  const history = useHistory();
  const { isAuthentication, logout } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const onClickSidePanel = ({ key }) => {
    if (key === "/logout") {
      logout();
    } else {
      history.push(replaceUrl(key, "-", "/"));
    }
  };

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
          theme="light"
          selectedKeys={replaceUrl(selectedKey)}
          mode="inline"
          onClick={(e) => onClickSidePanel(e)}
        >
          <Menu.Item key={path.home} icon={<PieChartOutlined />}>
            Home
          </Menu.Item>

          <SubMenu key="Note" icon={<UserOutlined />} title="Note">
            <Menu.Item key={replaceUrl(path.note)}>Note</Menu.Item>
            <Menu.Item key={replaceUrl(path.createNote)}>
              Create Note{replaceUrl(path.createNote)}
            </Menu.Item>
          </SubMenu>
          <SubMenu key="Tag" icon={<TeamOutlined />} title="Tag">
            <Menu.Item key={replaceUrl(path.tag)}>Tag</Menu.Item>
            <Menu.Item key={replaceUrl(path.createTag)}>Create Tag</Menu.Item>
          </SubMenu>
          <Menu.Item key={replaceUrl(path.register)} icon={<FileOutlined />}>
            Register
          </Menu.Item>
          {!isAuthentication && (
            <Menu.Item key={path.login} icon={<DesktopOutlined />}>
              Login
            </Menu.Item>
          )}
          {isAuthentication && (
            <Menu.Item key={"/logout"} icon={<FileOutlined />}>
              Logout
            </Menu.Item>
          )}
        </Menu>
      </Sider>
      <AntLayout className="site-layout">
        <Header />
        <Content style={{ margin: "0 16px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            className="site-layout-background"
            style={{ padding: 40, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
