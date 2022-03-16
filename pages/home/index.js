import React, { useEffect, useState } from "react";
import AntLayout from "../../components/AntLayout";
import { useRouter } from "next/router";
import LoginLayout from "../../components/LoginLayout";
import HomeDisplay from "../../components/HomeDisplay";

export default function Home() {
  const hasProfile = true;
  const hasSideBar = true;
  const router = useRouter();
  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    async function fetchData() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        credentials: "include",
      };

      fetch(
        "https://ij5p8quwsi.execute-api.us-west-2.amazonaws.com/dev/user",
        requestOptions
      )
        .then((response) => {
          if (response.status !== 200) {
            router.push(`/login?redirect=${router.asPath}`);
            setIsShown(false)
          } else {
            console.log("Successfully Login!");
            setIsShown(true)
            response.text().then((data) => {
              
              console.log(data);
            });
          }
        })
        .catch((error) => console.log(error));
    }
    fetchData();
  });

  return (
    <>
      {isShown ? (
        <AntLayout hasProfile={hasProfile} hasSideBar={hasSideBar}>
          <HomeDisplay/>
        </AntLayout>
      ) : (
        <LoginLayout hasProfile={false} hasSideBar={false}>
        </LoginLayout>
      )}
    </>
  );
}
