import Head from "next/head";
import React from "react";
import Copyright from "./Copyright";

import SideBar from "./SideBar";
import { Layout, Menu } from "antd";

const { SubMenu } = Menu;
const { Header, Content, Sider} = Layout;

export default function AntLayout(props) {
  return (
    <div>
      {/* Title name */}
      <Head>
        <title>CooPlan</title>
      </Head>
      <Layout >
        <Header className="header">
          {/* Logo */}
          <div className="logo">COOPLAN</div>
        </Header>
        </Layout>
        <Layout style={{ minHeight: '100vh' }}>
        <SideBar />
          <Layout className="site-layout" >
            {/* contents */}
            <Content
              className="site-layout-background"
              style={{ margin: '16px' }}
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
