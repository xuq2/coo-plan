import { Col, Layout, Row } from "antd";
import React from "react";
import ProfileIcon from "./ProfileIcon";
import Link from 'next/link';

const { Header } = Layout;
export function AntHeader(props) {
  return (
    <Layout>
      <Header className="header" style={{ backgroundColor: "#5F9FFF" }}>
        {/* Logo */}
        <Row>
            <Col span={12}>
            <div className="logo"><Link href="/home"><a>COOPLAN</a></Link></div>
            </Col>
            <Col span={12}>
            {props.hasProfile ? <ProfileIcon /> : ''}
            </Col>

        </Row>
        
      </Header>
    </Layout>
  );
}
