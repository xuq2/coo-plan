import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import AntLayout from '../components/AntLayout';
import LoginContainer from '../components/LoginContainer';
import LoginLayout from '../components/LoginLayout';


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
        headers: myHeaders,
        credentials: "include"
      };

      fetch("https://ij5p8quwsi.execute-api.us-west-2.amazonaws.com/dev/user", requestOptions)
        .then(response => {
          if(response.status !== 200) {
            router.push(`/login?redirect=${router.asPath}`);
          } else {
            console.log("Successfully Login!");
            response.text().then(data => {
              console.log(data);
            });
          }
        });
    }
    fetchData();
  });

  return (

    <LoginLayout hasProfile={hasProfile}>
      <LoginContainer/>
    </LoginLayout>
  );
}