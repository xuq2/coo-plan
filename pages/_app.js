import "../styles/globals.css";
import "../styles/AntLayout.css";
import Head from "next/head";
import favicon from '../public/favicon.png';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>CooPlan</title>
        <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
