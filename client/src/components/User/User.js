import React, {useEffect, useState} from 'react';
import { Card, Skeleton, Row, Col, Empty} from 'antd';
import { UserOutlined, UserAddOutlined, LoadingOutlined } from '@ant-design/icons';
import { Table, Tag, Space, Avatar, Spin, Button } from 'antd';
import { IoWatchOutline } from "react-icons/io5";

import './styles.css'
import * as dummy from './dummydata'
import {io} from 'socket.io-client'

const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: text => <a style={{color:'white', display:'flex', flexDirection:'row', alignItems:'center'}}><div style={{width:'100px'}}>{text} </div> <Avatar src={`${text}.jpeg`}/></a>,
    },
    {
        title: 'Wearable Name',
        dataIndex: 'wearable_name',
        key: 'wearable_name',
        render: text => 
            <>
              <Tag color={text == "Dance Band Pro" ? "pink" : "green"} style={{backgroundColor:"transparent", color:'white'}}>
                {text}
              </Tag>
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
    const [loading, setLoading] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)

    const handleClick = (e) => {
        setButtonLoading(true)
        setInterval(function(){ setButtonLoading(false) }, 3000);
    }
    const socket = io("http://localhost:5000")
    socket.on("connect", () => {
        console.log(`You connected with id: ${socket.id}`)
    })
    socket.emit('send-message', 'hi hi this is a message')
    // socket.emit("custom-event", 10, "Hi", {a:"a"})
    socket.on("receive-message", message => {
        console.log(message)
    })
    // const ENDPOINT = 'localhost:5000';
    // useEffect(() => {
    // }, [ENDPOINT])
    return ( 
        <div style={{fontSize:'10px', color:'white'}}>
            <div style={{position:'relative', display:'flex', flexDirection:'row', height:'140px', borderRadius:'20px', overflow:'hidden',  boxShadow: '0px 0px 20px 1px #202225', marginTop:'20px', backgroundColor:'#3A3C41', padding:'20px'}}>
              <Button type="primary" style={{position:'absolute', right:'0', marginRight:'20px'}}>Edit</Button>
              <Avatar style={{borderRadius:'10px', height:'100px', width:'100px'}} shape="square" src={`${user}.jpeg`}/>
                <div style={{marginLeft:'20px', display:'flex', flexDirection:'column', backgroundColor:'transparent'}}>
                {/* <div style={{fontSize:'20px'}}>{user}</div> */}
                <div style={{fontSize:'20px'}}>{localStorage.getItem('username')}</div>
                <div style={{marginTop:'0px', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}><IoWatchOutline fontSize="15px"/><div style={{marginLeft:'7px'}}>#sjsnjdks1123</div></div>
                <div> <Tag color="pink" style={{marginTop:'10px', backgroundColor:"transparent", color:'white', width:'100%', justifyContent:'center', display:'flex'}}>Dance Band Pro</Tag></div>
                </div>
            </div>
            <div style={{height:'60vh',borderRadius:'20px', overflow:'scroll',  boxShadow: '0px 0px 20px 1px #202225', marginTop:'20px', backgroundColor:'#3A3C41'}}>
                <Spin spinning={loading} delay={500} size="large">
                    <div style={{overflow:'scroll', borderRadius:'20px', backgroundColor:'#3A3C41', padding:'20px', marginTop:'0px'}} >
                        <div style={{marginLeft:'10px', fontSize:'20px', marginBottom:'10px', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                All Users <UserOutlined style={{marginLeft:'10px'}}/>
                            </div>
                            {/* <Button onClick={handleClick} type="primary" className="new-session"><UserAddOutlined /> Add User <Spin indicator={<LoadingOutlined style={{marginLeft:'10px', color:'white'}}/>} spinning={buttonLoading}/></Button> */}
                        </div>
                        <Table 
                        pagination={false}
                        columns={columns} 
                        dataSource={dummy.data} 
                        />
                    </div>
                </Spin>
            </div>
        </div>
     );
}
export default User;