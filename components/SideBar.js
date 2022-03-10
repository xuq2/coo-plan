import React, { useState } from "react";
import { Button, Divider, Layout, Menu } from "antd";

import {
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    // TODO:
    <>
      {/* TODO: background颜色要改, 选择颜色改变加重 */}
      <Sider
        style={{ backgroundColor: "#F0F4F9" }}
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <Menu
          style={{ backgroundColor: "#F0F4F9" }}
          defaultSelectedKeys={["1"]}
          mode="inline"
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Home
          </Menu.Item>
          
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Search
          </Menu.Item>
          <Menu.Item key="3" icon={<DesktopOutlined />}>
            Setting
          </Menu.Item>
          <Divider/>
          {/* TODO： 回收时不会隐藏 */}
          <Button>Make new plan</Button>
        </Menu>
      </Sider>
    </>
  );
}

export default SideBar;
