import Head from "next/head";
import React from "react";

import { Layout} from "antd";
import { AntHeader } from "./AntHeader";
import SideBar from "./SideBar";
import Copyright from "./Copyright";
const { Content } = Layout;
export default function AntLayout(props) {
  return (
    <div>
      <AntHeader hasProfile={props.hasProfile}/>
      
      <Layout style={{ minHeight: "100vh" }}>
        {props.hasSideBar ? <SideBar onAddNewPlan={props.onAddNewPlan} onAddGoalClick={props.onAddGoalClick} isDetailPage={props.isDetailPage}/> : ''}
        <Layout className="site-layout">
          {/* contents */}
          <Content
            className="site-layout-background"
            style={{ margin: "16px" }}
          >
            {props.children}
          </Content>
          {/* footer */}
          <Copyright />
        </Layout>
      </Layout>
    </div>
  );
}
