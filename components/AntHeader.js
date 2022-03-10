import { Col, Layout, Row } from "antd";
import React from "react";
import ProfileIcon from "./ProfileIcon";
const { Header } = Layout;
export function AntHeader(props) {
  return (
    <Layout>
      <Header className="header" style={{ backgroundColor: "#5F9FFF" }}>
        {/* Logo */}
        <Row>
            <Col span={12}>
            <div className="logo">COOPLAN 
        </div>
            </Col>
            <Col span={12}>
            {props.hasProfile ? <ProfileIcon /> : ''}
            </Col>

        </Row>
        
      </Header>
    </Layout>
  );
}
