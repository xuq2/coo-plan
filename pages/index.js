import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import AntLayout from '../components/AntLayout';

export default function Login() {
  const router = useRouter();
  const hasProfile = true;
  const hasSideBar = true;

  useEffect(() => {
    async function fetchData() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders
      };
      fetch("https://ij5p8quwsi.execute-api.us-west-2.amazonaws.com/dev/user", requestOptions)
        .then(response => response.text())
        .then(result => {
          const res = JSON.parse(result);
          console.log(res);
          if(res['statusCode'] === 401) {
            router.push(`/login?redirect=${router.asPath}`);
          } else {
            console.log("Successfully Login!");
          }
        })
        .catch(error => console.log('error', error));
    }
    fetchData();
  });

  return (
    <AntLayout hasProfile={hasProfile} hasSideBar={hasSideBar}>
      <h1>Home</h1>
    </AntLayout>
  );
}