/** @jsxImportSource @emotion/react */
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const { Sider, Content } = Layout;

export const Layouts = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const defaultSelectedKey = currentPath === "/" ? "/" : currentPath;

  const handleMenuClick = (pagePath: string) => {
    navigate(pagePath);
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: "100vh" }}
      >
        <div className="flex items-center justify-end">
          <button
            onClick={() => setCollapsed(!collapsed)}
            css={css`
              font-size: 16px;
              margin-right: 10px;
              margin-top: 25px;
              width: 64;
              height: 64;
              color: white;
            `}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          css={css`
            margin-top: 10px;
          `}
          mode="inline"
          theme="dark"
          defaultSelectedKeys={[defaultSelectedKey]}
          selectedKeys={[defaultSelectedKey]}
          items={[
            {
              key: "/",
              icon: <UserOutlined />,
              label: <Link to="/">Company </Link>,
              onClick: () => handleMenuClick("/"),
              className: currentPath === "/" ? "active-menu-item" : "",
            },
            {
              key: "/Job",
              icon: <VideoCameraOutlined />,
              label: <Link to="/Job">Job </Link>,
              onClick: () => handleMenuClick("/Job"),
              className: currentPath === "/Job" ? "active-menu-item" : "",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
