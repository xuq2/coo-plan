import React, { useState } from "react";
import { Button, DatePicker, Divider, Layout, Menu, Space, notification } from "antd";

import {
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

function SideBar(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [ planYear, setPlanYear ] = useState("");
  console.log(props.allData)

  async function addNewPlan() {
    notification.close('makeNewPlanError');
    if(planYear) {
      try {
        props.allData.find(element => {
          if (element.toString().includes(planYear)) {
            openNotificationWithIcon('error', 'Plan year already exists')
          }
        });
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "year": parseInt(planYear)
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            credentials: 'include'
        };

        fetch("https://ij5p8quwsi.execute-api.us-west-2.amazonaws.com/dev/user/new-plan", requestOptions)
        .then(response => {
            if(response.status === 200) {
              console.log("Successfully added new plan")
              openNotificationWithIcon('success', 'Create successfully')
              props.onAddNewPlan(planYear);
            } else if(response.status === 304) {
              // openNotificationWithIcon('error', 'Plan year already exists');
            }else {
              response.text().then(error => {
                  openNotificationWithIcon('error', error);
              });
            }
        })
        .catch(error => console.log('error', error));
      } catch(e) {
          console.log(e);
      }
    }
    else {
      openNotificationWithIcon('warn', 'You don\'t have inputs')
    }
  }

  const openNotificationWithIcon = (type, description) => {
    notification[type]({
      message: 'Failed to make a new plan',
      description: description,
      duration: 2,
      key: 'makeNewPlanError'
    });
  };

  return (
    // TODO:
    <>
      {/* TODO: background颜色要改, 选择颜色改变加重 */}
      <Sider
        style={{ backgroundColor: "#F0F4F9"}}
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        width="210px"
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
          {props.isShowAddNewPlan ? (
            <>
          <Menu.Item style={{height: 100}} key="4" title="Make new plan" icon={<DesktopOutlined /> } >
          <Space direction="vertical">
            <Button onClick={()=>addNewPlan()}>Make new plan</Button>
          <DatePicker onChange={(date, dateString)=> {setPlanYear(dateString)}} picker="year"/>
          </Space>
          </Menu.Item>
            </>
          )  : (
            <Menu.Item key="4" title="Make new plan" icon={<DesktopOutlined /> } >
              <Button onClick={props.onAddGoalClick}>Add a goal</Button>
            </Menu.Item>
          )}
        </Menu>
      </Sider>
    </>
  );
}

export default SideBar;
