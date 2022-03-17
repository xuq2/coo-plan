import { Avatar,Dropdown, Menu } from "antd";
import React, { useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link'
import { OmitProps } from "antd/lib/transfer/ListBody";

//TODO: to be applied in pages
function ProfileIcon(props) {
  const router = useRouter();
  const handleClick = e=> {
    // console.log(e.key)
    switch (e.key) {
      case "0":
        console.log(0)
        break;
      case "1":
        console.log(1)
        
        break;
      case "2":
        async function logout(){
          try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              credentials: "include",
              body: ""
          };
          fetch("https://ij5p8quwsi.execute-api.us-west-2.amazonaws.com/dev/user/logout", requestOptions)
          .then(response=> {
            console.log(response)
            if(response.status == 200) {
              console.log("logout!")
              router.push('/login');
            }
            else {
              console.log("Log out fail")
            }
          })
          }
          catch(e) {
            console.error(e);
          }
        }
        logout();
        break;
      default:
        break;
    }

  }


  const menu = (
    <Menu style={{margin: "10px", textAlign: 'center'}} onClick={handleClick}>
      <Menu.Item key="0">
        <Link href="/profile">
        Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        {/* <a href=""> */}
        Settings
        {/* </a> */}
      </Menu.Item>
      <Menu.Item key="2" >Log Out</Menu.Item>
    </Menu>
  );
  return (
    <div style={{ float: "right", verticalAlign: "middle" }}>
      <Dropdown overlay={menu} trigger={["click"]} placement="bottom" >
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <Avatar alt="A" size="large">
            {props.initial.toUpperCase()}
          </Avatar>
        </a>
      </Dropdown>
    </div>
  );
}

export default ProfileIcon;
