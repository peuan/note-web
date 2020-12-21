import { Layout as AntLayout, Menu, Badge, Avatar, Dropdown } from "antd";
import { useContext, useState } from "react";
import { path } from "../route";
import { useHistory } from "react-router-dom";
import {
  HomeOutlined,
  DesktopOutlined,
  FileOutlined,
  UserOutlined,
  TagOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../contexts";
import SubMenu from "antd/lib/menu/SubMenu";
import { getUrlKey } from "../utils";

const { Sider, Header, Content } = AntLayout;
const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

const Layout = ({ children, selectedKey, defaultOpenKey }) => {
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
      history.push(path[key]);
    }
  };

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
          theme="light"
          selectedKeys={getUrlKey(selectedKey)}
          mode="inline"
          onClick={(e) => onClickSidePanel(e)}
          defaultOpenKeys={[defaultOpenKey]}
        >
          <Menu.Item key={getUrlKey(path.home)} icon={<HomeOutlined />}>
            Home
          </Menu.Item>

          <SubMenu key="note" icon={<UserOutlined />} title="Note">
            <Menu.Item key={getUrlKey(path.note)}>Note</Menu.Item>
            <Menu.Item key={getUrlKey(path.createNote)}>Create Note</Menu.Item>
          </SubMenu>
          <SubMenu key="tag" icon={<TagOutlined />} title="Tag">
            <Menu.Item key={getUrlKey(path.createTag)}>Create Tag</Menu.Item>
          </SubMenu>
          <Menu.Item key={getUrlKey(path.register)} icon={<FileOutlined />}>
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
          <Menu.Item icon={<StopOutlined />}>Trash</Menu.Item>
        </Menu>
      </Sider>
      <AntLayout className="site-layout">
        <Header style={{ textAlign: "end" }}>
          <span className="avatar-item">
            <Badge count={1}>
              <Dropdown overlay={menu} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Avatar
                    style={{ color: "#f56a00", backgroundColor: "#BFC9CA" }}
                    size={40}
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                </a>
              </Dropdown>
            </Badge>
          </span>
        </Header>
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
