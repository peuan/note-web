import {
  Layout as AntLayout,
  Menu,
  Badge,
  Avatar,
  Dropdown,
  Skeleton,
  Divider,
  Typography,
  Row,
  Button,
} from "antd";
import { useContext, useEffect, useState } from "react";
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
import { NotificationService } from "../services";

const { Sider, Header, Content } = AntLayout;
const { Paragraph } = Typography;

const Layout = ({ children, selectedKey, defaultOpenKey }) => {
  const history = useHistory();
  const { isAuthentication, logout } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const [notifications, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [meta, setMeta] = useState({
    currentPage: 0,
    itemsPerPage: 5,
  });
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = async () => {
    setIsLoading(true);
    try {
      const response = await NotificationService.getNotifications({
        page: Number(meta.currentPage) + 1,
        limit: meta.itemsPerPage,
      });
      setNotification(notifications.concat(response.items));
      setMeta(response.meta);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const onClickSidePanel = ({ key }) => {
    if (key === "/logout") {
      logout();
    } else {
      history.push(path[key]);
    }
  };
  const getNotificationType = {
    LIKED_NOTE: "ถูกใจ",
  };

  const onClickNotification = async (notification) => {
    setVisible(false);
    console.log(notification);
    const notificationId = notification.id;
    if (notification.read === false) {
      const response = NotificationService.readNotification(notification.id);
      console.log(response);
      const index = notifications.findIndex(
        (notification) => notification.id === notificationId
      );
      const newNotification = [...notifications];
      const notificationNote = newNotification[index];
      notificationNote.read = true;
      setNotification(newNotification);
    }
    if (notification.type === "LIKED_NOTE") {
      history.push(`${path.notificationNote}/${notification.noteId}`);
    }
  };

  const onVisibleChange = (visible) => {
    setVisible(visible);
  };
  const menu = (
    <Menu style={{ width: "400px" }}>
      {notifications.map((notification) => {
        return (
          <Menu.Item
            onClick={() => onClickNotification(notification)}
            style={{ maxWidth: "400px" }}
            key={notification.id}
          >
            <Row justify="space-between" align="middle">
              <div>
                {notification.fromUser.firstName}
                {notification.fromUser.lastName}
                {getNotificationType[notification.type]}
                <Paragraph
                  ellipsis={{ rows: 1, expandable: false, symbol: "more" }}
                >
                  {notification.title}
                </Paragraph>
              </div>

              {notification.read === false && (
                <Badge color="#2db7f5" style={{ height: "fit-content" }} />
              )}
            </Row>
            <Divider style={{ margin: "10px 0px" }} />
          </Menu.Item>
        );
      })}
      {isLoading && (
        <Menu.Item>
          <Skeleton active style={{ width: "100px" }} />
        </Menu.Item>
      )}
      {Number(meta.currentPage) !== Number(meta.totalPages) && !isLoading && (
        <Button onClick={getNotification}>More...</Button>
      )}
    </Menu>
  );

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
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                visible={visible}
                onVisibleChange={onVisibleChange}
              >
                <Avatar
                  style={{ color: "#f56a00", backgroundColor: "#BFC9CA" }}
                  size={40}
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
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
