import { Avatar, Menu } from "antd";
import React, { useState } from "react";
import { AntHeader } from "./AntHeader";
import { UserOutlined } from "@ant-design/icons";

//TODO: to be applied in pages
function ProfileIcon() {
  
  return(
    <div style={{float: 'right',verticalAlign: 'middle'}}>
    <Avatar alt="A" size="large">A</Avatar>
  </div>
  );
}

export default ProfileIcon;
