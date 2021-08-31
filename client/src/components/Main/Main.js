import React from 'react';
import {  Layout,Menu,Avatar, Button, Select } from 'antd';
import { DashboardOutlined, UserOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { CollectionPlay } from 'react-bootstrap-icons';
import { Switch, Route, Link, useLocation, Redirect} from "react-router-dom";
import Overview from '../Overview/Overview';
import Session from '../Session/Session'
import User from '../User/User'
import '../../style/custom-antd.css'
import './styles.css'

const Main = () => {
    const { Option } = Select;
    const location = useLocation();
    const { Header, Content, Sider } = Layout;
    const [collapse, setCollapse] = React.useState(false)
    const [user, setUser] = React.useState('Alex')
    const handleCollapse = () => {setCollapse(!collapse)}
    const handleChange = (value) => {setUser(value)}
    return ( 
        <div>
            <Layout style={{ height: '100vh', overflow:'hidden'}}>
                <Sider width={200} className="sider"
                // collapsible 
                collapsed={collapse}
                onCollapse={handleCollapse}
                >
                    <Button type="primary" onClick={handleCollapse} style={{border:'0px', borderRadius:'0px', backgroundColor: '#5a65ea' , position:'absolute', bottom:'0', width:'100%', height:'50px'}}>
                        {collapse ? <RightOutlined /> : <LeftOutlined />}
                    </Button>
                    <div className="logo">
                        <img src="DanceOnLogo.svg" style={{height:'40px'}}/>
                        {collapse ? null : <div style={{marginLeft:'10px'}}>DANCE<span style={{fontWeight:'bold', color:'#5a65ea'}}>DANCE</span></div>}
                        
                    </div>
                    <Menu
                        style={{ height: '100%', borderRightColor:'transparent', 
                        backgroundColor:'#202225', 
                        color:'#9C9EAA'}}
                        defaultSelectedKeys={location.pathname == '/' ? ['overview'] : [location.pathname.slice(1)]}
                        mode="inline"
                    >
                        <Menu.Item className="menuItem" key="overview" icon={<DashboardOutlined style={{fontSize:'25px'}}/>}>
                            <Link to="/overview">
                                Overview
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="menuItem" key="session" icon={<CollectionPlay style={{fontSize:'25px'}}/>}>
                            <Link to="/session" >Session</Link>
                        </Menu.Item>   
                        <Menu.Item className="menuItem" key="users" icon={<UserOutlined style={{fontSize:'25px'}}/>}>
                            <Link to="/users" >Users</Link>
                        </Menu.Item>   
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="header">
                        {location.pathname == '/overview' ? 'Overview' : (location.pathname == '/users' ? 'Users' : (location.pathname == '/session' ? 'Session': null))}
                        <div style={{position:'absolute', right:'0', marginRight:'20px',  fontWeight:'normal', fontSize:'15px', display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <Avatar size={40} src={`${user}.jpeg`} icon={<UserOutlined />} />
                            <div style={{marginRight:'0px'}}> 
                                <Select defaultValue="Alex" style={{ width: 80}} onChange={handleChange}>
                                    <Option value="Alex">Alex</Option>
                                    <Option value="Lucy">Lucy</Option>
                                </Select>
                            </div>
                        </div>
                    </Header>
                    <Content className="content" >
                        <Switch>
                            <Route exact path="/"><Redirect to="/overview" /></Route>
                            <Route path="/overview">
                                <Overview user={user}/>
                            </Route>
                            <Route path="/users">
                                <User />
                            </Route>
                            <Route path="/session">
                                <Session />
                            </Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </div>
     );
}
 
export default Main;


    