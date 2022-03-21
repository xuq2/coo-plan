import React, { useState, useEffect } from "react";
import { Button, DatePicker, Divider, Layout, Menu, Space, notification } from "antd";
import Link from 'next/link'
import {
  DesktopOutlined,
  PieChartOutlined,
  SearchOutlined,
  HomeOutlined,
  SettingOutlined,
  CarryOutOutlined,
  FolderAddOutlined
} from "@ant-design/icons";

const { Sider } = Layout;
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
function SideBar(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [ planYear, setPlanYear ] = useState("");
  console.log(props.allData)
  const size = useWindowSize();
  console.log(size.width)
  // if(size.width<=700) {
  //   setCollapsed(true)
  // }
  // else {
  //   setCollapsed(false)
  // }

  async function addNewPlan() {
    notification.close('makeNewPlanError');
    if(planYear) {
      try {
        props.allData.find(element => {
          if (element.toString().includes(planYear)) {
            openNotificationWithIcon('error', 'Failed to create new plan', 'Plan year already exists')
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
              openNotificationWithIcon('success', 'Success', 'Create successfully')
              props.onAddNewPlan(planYear);
            } else if(response.status === 304) {
              // openNotificationWithIcon('error', 'Plan year already exists');
            }else {
              response.text().then(error => {
                  openNotificationWithIcon('error', 'Failed to create new plan', error);
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

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      duration: 2,
      key: 'makeNewPlanError'
    });
  };

  
  return (
    // TODO:
    <>
      {/* TODO: background颜色要改, 选择颜色改变加重 */}
      {size.width<=800 ? (
        <Sider
        style={{ backgroundColor: "#F0F4F9"}}
        collapsible
        collapsed={true}
        onCollapse={() => setCollapsed(!collapsed)}
        width="210px"
      >
        <Menu
          style={{ backgroundColor: "#F0F4F9" }}
          defaultSelectedKeys={["1"]}
          mode="inline"
          
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link href='/home'>Home</Link>
          </Menu.Item>
          
          <Menu.Item key="2" icon={<SearchOutlined />}>
            Search
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            Setting
          </Menu.Item>
          <Divider/>
          {/* TODO： 回收时不会隐藏 */}
          {props.isShowAddNewPlan ? (
            <>
          <Menu.Item style={{height: 100}} key="4" title="Make new plan" icon={<FolderAddOutlined /> } >
          <Space direction="vertical">
            <Button onClick={()=>addNewPlan()}>Make new plan</Button>
          <DatePicker onChange={(date, dateString)=> {setPlanYear(dateString)}} picker="year"/>
          </Space>
          </Menu.Item>
            </>
          )  : (
            <Menu.Item key="4" title="Add a goal" icon={<CarryOutOutlined /> } onClick={props.onAddGoalClick} >
              <Button onClick={props.onAddGoalClick}>Add a goal</Button>
            </Menu.Item>
          )}
        </Menu>
      </Sider>
      ) : (
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
          <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link href='/home'>Home</Link>
          </Menu.Item>
          
          <Menu.Item key="2" icon={<SearchOutlined />}>
            Search
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            Setting
          </Menu.Item>
          <Divider/>
          {/* TODO： 回收时不会隐藏 */}
          {props.isShowAddNewPlan ? (
            <>
          <Menu.Item style={{height: 100}} key="4" title="Make new plan" icon={<FolderAddOutlined /> } >
          <Space direction="vertical">
            <Button onClick={()=>addNewPlan()}>Make new plan</Button>
          <DatePicker onChange={(date, dateString)=> {setPlanYear(dateString)}} picker="year"/>
          </Space>
          </Menu.Item>
            </>
          )  : (
            <Menu.Item key="4" title="Add a goal" icon={<CarryOutOutlined /> } onClick={props.onAddGoalClick} >
              <Button onClick={props.onAddGoalClick}>Add a goal</Button>
            </Menu.Item>
          )}

        </Menu>
      </Sider>
      )}
        
      
    </>
  );
}

export default SideBar;
