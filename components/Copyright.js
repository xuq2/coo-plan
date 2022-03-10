import React from "react";
import { Layout} from 'antd';


const {Footer} = Layout;

function Copyright() {
    return (
        <Footer style={{ textAlign: 'center' }}> Copyright © <a href=''>COOPLAN </a>{new Date().getFullYear()}.</Footer>
    )
}

export default Copyright