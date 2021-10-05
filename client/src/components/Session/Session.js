import React, {useEffect, useState} from 'react';
import { Table, Tag, Space, Avatar, Spin, Button } from 'antd';

import { UserOutlined, AntDesignOutlined,LoadingOutlined, PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { AppIndicator, CollectionPlay } from 'react-bootstrap-icons';
import {io} from 'socket.io-client'

import * as dummy from './dummydata'
import './styles.css'
import Authorisation from '../Authorisation/Authorisation'
import NewSession from './NewSession'
import * as api from '../api/index'
import Modal from 'react-modal';



const Session = () => {
  const columns = [
    {
      title: 'Session Name',
      dataIndex: 'sessionName',
      key: 'sessionName',
      render: text => <a style={{color:'white'}}>{text}</a>,
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'Total Participants',
      dataIndex: 'numberOfUsers',
      key: 'numberOfUsers',
      align: 'center',
    },
    {
      title: 'Users',
      key: 'users',
      render: (text) => (
        <div>
        <Avatar.Group>{text.users.map((u)=>{return(
          <Avatar src={u.userImage}>{u.userImage}</Avatar>
        )
          }
        )}</Avatar.Group>
        
        </div>
      ),
    },
    {
      title: 'Usernames',
      key: 'users',
      align: 'center',
      render: (text) => (
        <div>
        {text.users.map((u)=>{return (
           <Tag color='pink' style={{background:'transparent', color:'pink'}}>
              {u.username}
           </Tag>
        
        )})} 
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={handleView}>View</a>
        </Space>
      ),
    },
  ];
    const [loading, setLoading] = useState(false)    
    const [buttonLoading, setButtonLoading] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sessionList, setSessionList] = useState([])
    const [sessionLoading, setSessionLoading] = useState(false)
    const [socket, setSocket] = useState(null)

    const handleView = () => {
      alert('clicked!')
    }
    const handleClick = (event) =>{
      setIsModalVisible(true)
      setInterval(()=>{setIsModalVisible(false)},1)

    }
    const getSessions = async() => {
      try {
        setSessionLoading(true)
        await api.getSessions().then((data)=>{
          console.log(data.data)
          setSessionList(data.data)
          setSessionLoading(false)
        })
        
      } catch (error) {
        
      }
    }

    useEffect(() => {
      const messageListener = (data) => {
        getSessions()
        // console.log(data)
      };
      if(socket!=null){
        socket.on('newSessions', messageListener)
      return () => {
        socket.off('newSessions', messageListener);
      };
      }
      
    }, [socket])

    useEffect(() => {
      setSocket(io("http://localhost:5000"))
    }, [])

    useEffect(()=>{
      getSessions()
    },[])

    return ( 
        <div style={{justifyContent:'center', width:'100%', position:'relative', marginTop:'0px'}}>
          <div>
            <NewSession openModal={isModalVisible}/>
          </div>
        <div style={{borderRadius:'20px', overflow:'hidden',  boxShadow: '0px 0px 20px 1px #202225', marginTop:'20px', backgroundColor:'#3A3C41'}}>
          <Spin spinning={sessionLoading} delay={500} size="large">
            <div style={{overflow:'scroll', borderRadius:'20px', backgroundColor:'#3A3C41', padding:'20px', marginTop:'0px'}}>
                <div style={{marginLeft:'10px', fontSize:'20px', marginBottom:'10px', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <div style={{display:'flex', alignItems:'center', color:'white'}}>All Sessions <CollectionPlay style={{marginLeft:'10px'}}/></div>
                    <Button onClick={handleClick} type="primary" className="new-session"><PlusCircleOutlined /> New Session <Spin indicator={<LoadingOutlined style={{marginLeft:'10px', color:'white'}}/>} spinning={buttonLoading}/></Button>
                  </div>
                <Table 
                pagination={false}
                columns={columns} 
                dataSource={sessionList} />
            </div>
          </Spin>
        </div>
        </div>
     );
}
 
export default Authorisation(Session);