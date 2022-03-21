import { Col, Layout, Row } from "antd";
import React from "react";
import ProfileIcon from "./ProfileIcon";
import Link from 'next/link';
import Image from "next/image";

const { Header } = Layout;
export function AntHeader(props) {
  return (
    <Layout>
      <Header className="header" style={{ backgroundColor: "#5F9FFF" }}>
        {/* Logo */}
        <Row>
            <Col span={12}>
            <div className="logo"><Link href="/home"><a><Image priority={true} src="/logo.png" alt="Logo" layout="fixed" width={"200"} height={"65"} /></a></Link></div>
            </Col>
            <Col span={12}>
            {props.hasProfile ? (props.username ? <ProfileIcon initial={props.username[0]}/> : <ProfileIcon initial=""/>): ''}
            </Col>
        </Row>
        
      </Header>
    </Layout>
  );
}
