import React, { useState } from 'react';
import { Button, notification } from 'antd';
import 'antd/dist/antd.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LoginContainer() {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const router = useRouter();

    async function login() {
        if (username && password) {
            notification.close('signInError')
            try {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "username": username,
                    "password": password
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    credentials: "include",
                    body: raw
                };

                fetch("https://ij5p8quwsi.execute-api.us-west-2.amazonaws.com/dev/user/login", requestOptions)
                    .then(response => {
                        if(response.status !== 200) {
                            response.text().then(data => {
                                openNotificationWithIcon('error', data);
                            });
                        } else {
                            router.push(router.query.redirect || '/');
                        }
                    })
            } catch(e) {
                console.log(e);
            }
        }
    }

    const openNotificationWithIcon = (type, description) => {
        notification[type]({
          message: 'Sign In Error',
          description: description,
          duration: 0,
          key: 'signInError'
        });
      };

    function removeFocus(e) {
        var target = e.target.parentElement;
        var input = e.target;
        if(input.value == ""){
          if(target.classList.contains('focused')){
            target.classList.remove('focused');
          }
          if(target.classList.contains('not-focused') == false){
            void target.offsetWidth;
            target.classList.add('not-focused');
          }
        }
      }
      
      function applyFocus(e) {
        var target = e.target.parentElement;
        if(target.classList.contains('not-focused')){
          target.classList.remove('not-focused');
        }
        if(target.classList.contains('focused') == false){
          void target.offsetWidth;
          target.classList.add('focused');
        }
      }
      

    return (
        <div className='center-container'>
            <h1 style={{color: 'white', fontSize: 24}}>Welcome to CooPlan</h1>
            <div className='input-wrapper'>
                <div className="input-field">
                    <input
                        type="text"
                        value={username}
                        name="username"
                        spellCheck="false"
                        className="info-input"
                        onFocus={(e)=>applyFocus(e)}
                        onBlur={(e)=>removeFocus(e)}
                        onChange={(e)=>setUsername(e.target.value)}/>
                    <label className="name-label">Username</label>
                    <span className="input-placeholder">Username</span>
                </div>
                <div className="input-field">
                    <input
                        type="password"
                        value={password}
                        name="password"
                        spellCheck="false"
                        className="info-input"
                        onFocus={(e)=>applyFocus(e)}
                        onBlur={(e)=>removeFocus(e)}
                        onChange={(e)=>setPassword(e.target.value)}/>
                    <label className="name-label">Password</label>
                    <span className="input-placeholder">Password</span>
                </div>
            </div>
            <div>
                <Link href="/signup" passHref><Button style={{marginRight: 20}}>Sign Up</Button></Link>
                <Link href="/home" passHref><Button onClick={()=>createUser()}>Sign In</Button></Link>
            </div>
        </div>
    );
}