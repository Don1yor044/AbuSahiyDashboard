/** @jsxImportSource @emotion/react */
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { BsClipboardCheck } from "react-icons/bs";
import { RiLayoutHorizontalLine } from "react-icons/ri";
import styled from "styled-components";
const SidebarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StyledMenu
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={({ key }) => navigate(key)}
      items={[
        {
          key: "/checkProducts",
          icon: <BsClipboardCheck size={18} />,
          label: "Check Product",
        },
        {
          key: "/allProducts",
          icon: <RiLayoutHorizontalLine size={20} />,
          label: "All Products",
        },
      ]}
    />
  );
};

export default SidebarMenu;
const StyledMenu = styled(Menu)`
  border-right: none;
  border-radius: 8px;
  background: transparent; /* Orqa fonni o'zgartirmasdan saqlaymiz */

  .ant-menu-item {
    margin-top: 10px;
    color: #ff602d !important; /* Gold color for menu items */
    background-color: white !important; /* Orqa fonni shaffof qilish */
  }

  .ant-menu-item:hover {
    background-color: #ff602d !important; /* Light gold hover */
    color: white !important; /* Keep text gold on hover */
  }

  .ant-menu-item-selected {
    background-color: #ff602d !important; /* Gold background for selected item */
    color: white !important; /* Black text for selected item */
  }
`;
