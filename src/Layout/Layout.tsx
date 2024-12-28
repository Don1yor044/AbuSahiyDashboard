import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Dispatch, SetStateAction, useState } from "react";
import SidebarMenu from "../components/sidebarMenu/sidebarMenu";
import { Outlet, useLocation } from "react-router";
import { HeaderPage } from "../components/checkProducts/header/header";

const { Header, Sider, Content } = Layout;
interface LayoutPageProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}
const LayoutPage = ({ search, setSearch }: LayoutPageProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  console.log(location.pathname);

  return (
    <Layout className="h-[100vh] !bg-gray-100">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="flex justify-center py-6">
          <img src="../abuSahiy.png" className="w-20" alt="Logo" />
        </div>
        <SidebarMenu />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background:
              "linear-gradient(90deg, #ff602d 0%, rgba(255,160,80,1) 100%)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <div className="flex">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "18px",
                width: 64,
                height: 64,
                color: "white",
                borderRadius: "10px",
                transition: "background-color 0.3s ease",
              }}
              className="!hover:bg-[#FF602D]"
            />
            {location.pathname == "/checkProducts" ? (
              <HeaderPage search={search} setSearch={setSearch} />
            ) : (
              <></>
            )}
          </div>
        </Header>
        <Content
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
