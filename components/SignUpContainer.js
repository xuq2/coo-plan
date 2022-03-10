import React, { useState } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

export default function SignUpContainer() {
    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");

    async function createUser() {
        console.log(email)
        console.log(username)
        console.log(password)
        if (username && email && password) {
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
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            } catch(e) {
                console.log(e);
            }
        }
    }

    return (
        <div>
            <div className="input-field">
                <input type="text" value={email} name="email" spellCheck="false" className="info-input" onChange={(e)=>setEmail(e.target.value)}/>
                <label className="name-label">Email</label>
                <span className="input-placeholder">Email</span>
            </div>
            <div className="input-field">
                <input type="text" value={username} name="username" spellCheck="false" className="info-input" onChange={(e)=>setUsername(e.target.value)}/>
                <label className="name-label">Username</label>
                <span className="input-placeholder">Username</span>
            </div>
            <div className="input-field">
                <input type="text" value={password} name="password" spellCheck="false" className="info-input" onChange={(e)=>setPassword(e.target.value)}/>
                <label className="name-label">Password</label>
                <span className="input-placeholder">Password</span>
            </div>
            <div className="input-field">
                <input type="text" value={confirmPassword} name="confirmPassword" spellCheck="false" className="info-input" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                <label className="name-label">Confirm Password</label>
                <span className="input-placeholder">Confirm Password</span>
            </div>
            <Button onClick={()=>createUser()}>Sign Up</Button>
        </div>
    );
}