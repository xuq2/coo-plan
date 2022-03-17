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
  const [ planYears, setPlanYears ] = useState([]);

  function addedNewPlan(year) {
    setPlanYears(oldYears => [...oldYears, year].sort((a,b)=>{
      return a-b;
    }));
  }

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
        "https://ij5p8quwsi.execute-api.us-west-2.amazonaws.com/dev/user/new-plan",
        requestOptions
      )
        .then((response) => {
          if (response.status !== 200) {
            router.push(`/login?redirect=${router.asPath}`);
            setIsShown(false)
          } else {
            console.log("Successfully Login!");
            setIsShown(true)
            response.json().then((data) => {
              if(data.length != 0) {
                setPlanYears(data[0]['years']);
              }
              console.log(data)
            });
          }
        })
        .catch((error) => console.log(error));
    }
    if(!isShown){
      fetchData();
    }
  });

  return (
    <>
      {isShown ? (
        <AntLayout hasProfile={hasProfile} hasSideBar={hasSideBar} onAddNewPlan={addedNewPlan}>
          <HomeDisplay planYears={planYears}/>
        </AntLayout>
      ) : (
        <LoginLayout hasProfile={false} hasSideBar={false}>
        </LoginLayout>
      )}
    </>
  );
}
