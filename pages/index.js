import React, { useEffect } from 'react';
import Link from 'next/link';
import LoginLayout from '../components/LoginLayout';
import { Button } from 'antd';


export default function Login() {
  const hasProfile = false;

  return (
    <LoginLayout hasProfile={hasProfile}>
      <Link href="/login" passHref><Button type='primary'>Log In</Button></Link>
    </LoginLayout>
  );
}