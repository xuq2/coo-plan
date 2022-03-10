import React, { useState } from 'react';
import { Button, notification } from 'antd';
import { useRouter } from 'next/router';
import 'antd/dist/antd.css';

export default function SignUpContainer() {
    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ showError, setShowError ] = useState("");
    const router = useRouter();

    async function createUser() {
        notification.close('signUpError');
        if(email === "") {
            openNotificationWithIcon('error', 'Please enter Email');
        } else if(username === "") {
            openNotificationWithIcon('error', 'Please enter Username');
        } else if(password === "") {
            openNotificationWithIcon('error', 'Please enter Password');
        } else if(confirmPassword === "") {
            openNotificationWithIcon('error', 'Please enter Confirm Password');
        }
        if (username && email && password && confirmPassword) {
            if(confirmPassword !== password) {
                openNotificationWithIcon('error', 'Confirm Password Doesn\'t match Password');
                return 0;
            }
            try {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "email": email,
                    "username": username,
                    "password": password
                });

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw
                };

                fetch("https://ij5p8quwsi.execute-api.us-west-2.amazonaws.com/dev/user", requestOptions)
                    .then(response => response.text())
                    .then(result => {console.log(result); router.push("/home")})
                    .catch(error => console.log('error', error));
            } catch(e) {
                console.log(e);
            }
        }
    }

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

    const openNotificationWithIcon = (type, description) => {
        notification[type]({
          message: 'Sign Up Error',
          description: description,
          duration: 0,
          key: 'signUpError'
        });
      };

    return (
        <div style={{height: 420}} className='center-container'>
            <div>
                <h1 style={{color: 'white', fontSize: 24, marginBottom: 0}}>Create an Account</h1>
            </div>
            <div className='input-wrapper'>
                <div className="input-field">
                    <input
                        type="text"
                        value={email}
                        name="email"
                        spellCheck="false"
                        className="info-input"
                        onFocus={(e)=>applyFocus(e)}
                        onBlur={(e)=>removeFocus(e)}
                        onChange={(e)=>setEmail(e.target.value)}/>
                    <label className="name-label">Email</label>
                    <span className="input-placeholder">Email</span>
                </div>
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
                <div className="input-field">
                    <input
                        type="password"
                        value={confirmPassword}
                        name="confirmPassword"
                        spellCheck="false"
                        className="info-input"
                        onFocus={(e)=>applyFocus(e)}
                        onBlur={(e)=>removeFocus(e)}
                        onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    <label className="name-label">Confirm Password</label>
                    <span className="input-placeholder">Confirm Password</span>
                </div>
            </div>
            
            <Button onClick={()=>createUser()}>Sign Up</Button>
        </div>
    );
}