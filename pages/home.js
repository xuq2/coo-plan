import React, { useEffect } from 'react';
import AntLayout from "../components/AntLayout";
import { useRouter } from 'next/router';

export default function Home() {
  const hasProfile = true;
  const hasSideBar = true;
  const router = useRouter();

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
        })
        .catch(error => console.log(error));
    }
    fetchData();
  });

  return (
    <AntLayout hasProfile={hasProfile} hasSideBar={hasSideBar}>
        <h1>lhome</h1>
    </AntLayout>
  );
}