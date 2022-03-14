import { Layout } from "antd";
import React, { useState } from "react";
import { AntHeader } from "./AntHeader";
import Copyright from "./Copyright";

export default function LoginLayout(props) {
  return (
    <>
      <AntHeader hasProfile={props.hasProfile} />
      <Layout style={{ minHeight: "100vh" }}>
      {props.children}
        {/* footer */}
      </Layout>
        <Copyright />
    </>
  );
}
