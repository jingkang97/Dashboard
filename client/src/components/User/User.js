import React, {useEffect, useState} from 'react';
import { UserOutlined, BarcodeOutlined } from '@ant-design/icons';
import { Table, Tag, Space, Avatar, Spin, Button, Input, Select, Upload, message } from 'antd';
import { IoWatchOutline } from "react-icons/io5";
import FileBase from 'react-file-base64'

import './styles.css'
import * as dummy from './dummydata'
import {io} from 'socket.io-client'
import * as api from '../api/index.js'

const columns = [
    {
      title: 'User',
      dataIndex: 'username',
      key: 'name',
      render: text => <a style={{color:'white', display:'flex', flexDirection:'row', alignItems:'center'}}><div style={{width:'100px'}}>{text} </div> <Avatar src={`${text}.jpeg`}/></a>,
    },
    {
        title: 'Wearable Name',
        dataIndex: 'wearable_name',
        key: 'wearable_name',
        render: text => 
            <>
              <Tag color={text == "Dance Band Pro" ? "pink" : (text == "Dance Band Lite" ? "green" : null)} style={{backgroundColor:"transparent", color:'white'}}>
                {text}
              </Tag>
            </>
      },
      {
        title: 'Wearable ID',
        dataIndex: 'wearable_id',
        key: 'wearable_id',
        render: text => 
            <>
              <div>{text}</div>
              {/* <Tag color={text == "Dance Band Pro" ? "pink" : "green"} style={{backgroundColor:"transparent", color:'white'}}>
                {text}
              </Tag> */}
            </>
      },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>View</a>
          <a style={{color:'red'}}>Delete</a>
        </Space>
      ),
    },
  ];

const User = ({user}) => {
    const { Option } = Select;
    const [users, setUsers] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)
    const [loading, setLoading] = useState(true)
    const [edit, setEdit] = useState(false)
    const [close, setClose] = useState(false)
    const [profile, setProfile] = useState({
      name: '',
      username: localStorage.getItem('username'),
      password: '',
      wearable_name: '',
      wearable_id: '',
      
    })
    
    const handleEdit = (e) => {
      setEdit(true)
    }
    const handleDismiss = (e) => {
      setEdit(false)
      getUser()
    }

    const handleSubmit = (e) => {
      setProfileLoading(true)
    }
    const handleUserChange = (e) =>{
      setProfile({...profile, username: e.target.value})
      console.log(profile.username)
    }

    const handleWearableIdChange = (e) =>{
      setProfile({...profile, wearable_id: e.target.value})
      console.log(profile.wearable_id)
    }
    const getUser = async() => {
      try {
        setProfileLoading(true)
        await api.getUser(user).then(user => {
          console.log(user)
          setProfile({
            username: user.data.username,
            password: user.data.password,
            wearable_name: user.data.wearable_name,
            wearable_id: user.data.wearable_id
          })
          console.log(user)
        })
      } catch (error) {
        alert(error)
      }
      finally{
        setProfileLoading(false)
      }
    }
    const getUsers = async() => {
      try {
        setLoading(true)
        await api.getUsers().then(users => {
          console.log(users)
          setUsers(users.data)
        })

      } catch (error) {
        alert(error)
      }
      finally{
        setLoading(false)
      }
    }

    const socket = io("http://localhost:5000")
    
    useEffect(() => {
        getUser()
        getUsers()

    },[])

    useEffect(() => {
      socket.on("newUser", (user) => {
        console.log(user)
      })
    }, [socket])

    return ( 
        <div style={{fontSize:'10px', color:'white'}}>
            <div style={{height:'100%', borderRadius:'20px', overflow:'hidden',  boxShadow: '0px 0px 20px 1px #202225', marginTop:'20px', backgroundColor:'#3A3C41'}}>
            <Spin spinning={loading} size="large">

                {edit ? null : 

                <div style={{position:'relative', display:'flex', flexDirection:'row', width:'100%', padding:'20px'}}>

                    <Button type="primary" style={{position:'absolute', right:'0', marginRight:'20px'}} onClick={handleEdit}>Edit</Button>
                      <Avatar style={{borderRadius:'10px', height:'100px', width:'100px'}} shape="square" src={`${user}.jpeg`}/>
                      <div style={{marginLeft:'20px', display:'flex', flexDirection:'column', backgroundColor:'transparent'}}>
                      {/* <div style={{fontSize:'20px'}}>{localStorage.getItem('username')}</div> */}
                      <div style={{fontSize:'20px'}}>{profile.username}</div>

                      <div style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}><IoWatchOutline fontSize="15px"/><div style={{marginLeft:'7px'}}>{profile.wearable_id}</div></div>
                      <div> <Tag color={profile.wearable_name == "Dance Band Pro" ? "pink" : (profile.wearable_name == "Dance Band Lite" ? "green" : null)} style={{marginTop:'10px', backgroundColor:"transparent", color:'white', width:'100%', justifyContent:'center', display:'flex'}}>{profile.wearable_name}</Tag></div>
                      </div>

                  

                  </div>
                }
                </Spin>
                {edit ? 
                
                <div style={{position:'relative', display:'flex', flexDirection:'row', width:'100%', padding:'20px'}}>
                                <Avatar style={{borderRadius:'10px', height:'100px', width:'100px'}} shape="square" src={`${user}.jpeg`}/>

                <div style={{position:'absolute', bottom:'0', right:'0', marginRight:'20px', marginBottom:'20px'}}>

                  <Button type="primary" onClick={handleDismiss}>Ok</Button>
                  <Button style={{borderRadius:'5px', background:'transparent', marginLeft:'10px'}} onClick={handleDismiss}>Cancel</Button>
                  
                  </div>
                  <div style={{marginLeft:'20px', display:'flex', flexDirection:'column', backgroundColor:'transparent'}}>
                    <div style={{fontSize:'20px'}}>
                      <div style={{fontSize:'15px', marginBottom:'5px'}}><UserOutlined /> Username</div>
                      <Input 
                            value={profile.username}
                            onChange={handleUserChange}
                            name="username" 
                            size="large" 
                            placeholder="username" 
                            style={{width:'90%', borderRadius:'8px', border:'transparent', background:'#2f3136'}}/>
                    </div>
                    
                    <div>
                    <div style={{fontSize:'15px', marginBottom:'5px', marginTop:'10px', display:'flex', flexDirection:'row', alignItems:'center'}}><IoWatchOutline style={{marginRight:'5px'}} fontSize="20px"/> Wearable Name</div>

                      <Select defaultValue="Dance Band Lite" size="large" style={{ width: '100%', borderRadius:'20px'}}>
                        <Option value="Dance Band Lite">Dance Band Lite</Option>
                        <Option value="Dance Band Pro">Dance Band Pro</Option>
                        <Option value="Not Selected">Not Selected</Option>

                      </Select>
                    </div>

                    <div style={{fontSize:'20px'}}>
                      <div style={{fontSize:'15px', marginBottom:'5px',  marginTop:'10px', marginLeft:'5px'}}><BarcodeOutlined style={{marginRight:'5px'}}/> Wearable ID</div>
                      <Input 
                            value={profile.wearable_id}
                            onChange={handleWearableIdChange}
                            name="username" 
                            size="large" 
                            placeholder="username" 
                            style={{width:'90%', borderRadius:'8px', border:'transparent', background:'#2f3136'}}/>
                    </div>
                  </div>
                </div> 
                : 
                null}
            </div>
            <div style={{height:'100%', maxHeight:'60vh',borderRadius:'20px', overflow:'scroll',  boxShadow: '0px 0px 20px 1px #202225', marginTop:'20px', backgroundColor:'#3A3C41'}}>
              <Spin spinning={loading} size="large">

                    <div style={{overflow:'scroll', borderRadius:'20px', backgroundColor:'#3A3C41', padding:'20px', marginTop:'0px'}} >
                        <div style={{marginLeft:'10px', fontSize:'20px', marginBottom:'10px', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                All Users <UserOutlined style={{marginLeft:'10px'}}/>
                            </div>
                        </div>
                        <Table 
                        pagination={false}
                        columns={columns} 
                        // dataSource={dummy.data} 
                        dataSource={users} 

                        />
                    </div>
                    </Spin>

            </div>

        </div>
     );
}
export default User;