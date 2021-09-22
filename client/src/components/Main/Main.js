import React, {useEffect, useState} from 'react';
import { Layout, Menu, Avatar, Button, Select, Dropdown } from 'antd';
import { DashboardOutlined, UserOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { CollectionPlay } from 'react-bootstrap-icons';
import { Switch, Route, Link, useLocation, Redirect, useHistory} from "react-router-dom";
import Overview from '../Overview/Overview';
import Session from '../Session/Session'
import User from '../User/User'
import '../../style/custom-antd.css'
import './styles.css'
import * as api from '../api/index'
import { useDispatch } from 'react-redux';


const Main = () => {
    const dispatch = useDispatch()
    const { Option } = Select;
    const location = useLocation();
    const history = useHistory();
    const { Header, Content, Sider } = Layout;
    const [collapse, setCollapse] = React.useState(false)
    const [user, setUser] = React.useState('')
    const [profile, setProfile] = useState({
        id: '',
        name: '',
        // username: localStorage.getItem('username'),
        username: JSON.parse(localStorage.getItem('profile'))?.username,
        password: '',
        wearable_name: '',
        wearable_id: '',
        image: JSON.parse(localStorage.getItem('profile'))?.image
      })
    const handleCollapse = () => {setCollapse(!collapse)}
    const handleChange = (value) => { 
        if(value == 'Logout'){
            dispatch({type: 'LOGOUT'})
            history.push('/login')
            localStorage.clear()
        }else{
            setUser(value)
        }
    }
    const getUser = async() => {
        try {
          await api.getUser(profile.username).then(user => {
            console.log(user)
            setProfile({
              id: user.data.id,
              name: user.data.name,
              username: user.data.username,
              password: user.data.password,
              wearable_name: user.data.wearable_name,
              wearable_id: user.data.wearable_id,
              image: user.data.image
            })
            console.log(user)
          })
        } catch (error) {
          alert(error)
        }
      }
    useEffect(() => {
        getUser()
    }, [])

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
                        <Avatar size={40} src={profile.image} icon={<UserOutlined />} />
                        {/* {localStorage.getItem('username')} */}
                            <div style={{marginRight:'0px'}}> 

    
                            <Select defaultValue={profile.username} style={{ width: '100%', minWidth:'70px'}} onChange={handleChange}>
                                {/* <Select defaultValue="Alex" style={{ width: '100%'}} onChange={handleChange}> */}
                                    {/* <Option value="Alex">Alex</Option>
                                    <Option value="Lucy">Lucy</Option>
                                    <Option value="Li Mingzhen">Mingzhen</Option> */}
                                    <Option value="Logout">Logout</Option>
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
                                <User user={user}/>
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


    