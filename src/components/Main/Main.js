import React from 'react';
import {  Layout,Menu,Avatar } from 'antd';
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';
import { CollectionPlay } from 'react-bootstrap-icons';

import Overview from '../Overview/Overview';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


import User from '../User/User'

// import 'antd/dist/antd.css';
import '../../style/custom-antd.css'
import './styles.css'



const Main = () => {
    const { Header, Content, Sider } = Layout;
    const [open, setOpen] = React.useState(false)
    const [user, setUser] = React.useState('Alex')
    const handleClick = e => {
        console.log('click ', e);
    };
    const handleCollapse = () => {
        setOpen(!open)
    }
    return ( 
        <div>
            <Router>
            <Layout style={{ height: '100vh', overflow:'hidden'}}>
                <Sider width={200} className="sider"
                // collapsible collapsed={open}
                // onCollapse={handleCollapse}
                >
                    <div className="logo">
                        <img src="DanceOnLogo.svg" style={{height:'50px'}}/>
                        <div style={{marginLeft:'10px'}}>DANCE<span style={{fontWeight:'bold', color:'#5a65ea'}}>ON</span></div>
                    </div>
                    <Menu
                        // theme="dark"
                        onClick={handleClick}
                        style={{ height: '100%', borderRightColor:'transparent', 
                        backgroundColor:'#202225', 
                        // padding:'10px',
                        // backgroundColor: 'white',
                        color:'#9C9EAA'}} defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <Menu.Item className="menuItem" key="1" icon={<DashboardOutlined style={{fontSize:'25px'}}/>}>Overview</Menu.Item>
                        <Menu.Item className="menuItem" key="2" icon={<CollectionPlay style={{fontSize:'25px'}}/>}>Sessions</Menu.Item>   
                        <Menu.Item className="menuItem" key="3" icon={<UserOutlined style={{fontSize:'25px'}}/>}>Users</Menu.Item>   
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="header">
                        Header
                        <div style={{position:'absolute', right:'0', marginRight:'20px',  fontWeight:'normal', fontSize:'15px', display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <div style={{marginRight:'10px'}}> 
                                {user}
                            </div>
                            <Avatar size={40}  icon={<UserOutlined />} />
                        </div>
                    </Header>
                    <Content className="content" >
                        <Overview />
                    </Content>
                </Layout>
            </Layout>
            </Router>
        </div>
     );
}
 
export default Main;


    