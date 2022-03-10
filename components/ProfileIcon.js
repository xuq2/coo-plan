import { Avatar, Button, Dropdown, Menu } from "antd";
import React, { useState } from "react";
import { AntHeader } from "./AntHeader";
import { UserOutlined } from "@ant-design/icons";

//TODO: to be applied in pages
function ProfileIcon() {
  const menu = (
    <Menu style={{margin: "10px", textAlign: 'center'}}>
      <Menu.Item key="0">
        <a href="">Profile</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="">Settings</a>
      </Menu.Item>
      <Menu.Item key="2">Log Out</Menu.Item>
    </Menu>
  );
  return (
    <div style={{ float: "right", verticalAlign: "middle" }}>
      <Dropdown overlay={menu} trigger={["click"]} placement="bottom" >
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <Avatar alt="A" size="large">
            A
          </Avatar>
        </a>
      </Dropdown>
    </div>
  );
}

export default ProfileIcon;
