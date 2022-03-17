import React, { useEffect } from "react";
import Link from "next/link";
import LoginLayout from "../components/LoginLayout";
import { Button, Row } from "antd";
import { TextLoop } from "react-text-loop-next";

export default function Login() {
  const hasProfile = false;

  return (
    <LoginLayout hasProfile={hasProfile}>
      <Row justify="center" className="text-loop-container">
        <h1 className="text-loop">
          Your First{" "}
          <TextLoop springConfig={{ stiffness: 180, damping: 8 }} className="inside-text">
            <span>College</span>
            <span>High School</span>
            <span>Life</span>
          </TextLoop>{" "}
          Planner App.
        </h1>
      </Row>
      <Row justify="center">
        <Link href="/login" passHref>
          <Button type="primary">Log In</Button>
        </Link>
      </Row>
    </LoginLayout>
  );
}
