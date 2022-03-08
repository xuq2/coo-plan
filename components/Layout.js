import Head from 'next/head';
import React from 'react';
import Copyright from './Copyright';

import Navbar from './Navbar';

export default function Layout(props) {
  return (
    <div>
      {/* Title name */}
      <Head>
        <title>CooPlan</title>
      </Head>
      {/* Header name */}
      <div>COOPLAN</div>
      {/* navbar(sidebar) */}
      <Navbar />
      {/* contents */}
      {props.children}

      {/* footer */}
      <Copyright />
    </div>
  )
}