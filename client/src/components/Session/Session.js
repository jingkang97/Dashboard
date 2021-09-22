import React, {useEffect, useState} from 'react';
import { Table, Tag, Space, Avatar, Spin, Button } from 'antd';
import { UserOutlined, AntDesignOutlined,LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { CollectionPlay } from 'react-bootstrap-icons';
import {io} from 'socket.io-client'

import * as dummy from './dummydata'
import './styles.css'
import Authorisation from '../Authorisation/Authorisation'

const columns = [
  {
    title: 'Session Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a style={{color:'white'}}>{text}</a>,
  },
  {
    title: 'Start Time',
    dataIndex: 'start_time',
    key: 'start_time',
  },
  {
    title: 'End Time',
    dataIndex: 'end_time',
    key: 'end_time',
  },
  {
    title: 'Total Participants',
    dataIndex: 'total_participants',
    key: 'total_participants',
    align: 'center',
  },
  {
    title: 'Users',
    key: 'users',
    render: () => (
        <Avatar.Group>
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <Avatar style={{ backgroundColor: '#59BDF3' }}>K</Avatar>
        <Avatar style={{ backgroundColor: '#E66286' }} icon={<UserOutlined />} />
        <Avatar style={{ backgroundColor: '#FF935A' }} icon={<AntDesignOutlined />} />
      </Avatar.Group>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>View</a>
      </Space>
    ),
  },
];

const Session = () => {
    const [socket, setSocket] = useState(null)
    const [loading, setLoading] = React.useState(true)
    // const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
    const [buttonLoading, setButtonLoading] = useState(false)
    const [array, setArray] = useState([])
    const [start, setStart] = useState(false)
    setInterval(function(){ setLoading(false) }, 3000);
    const handleCLick = (event) =>{
      setButtonLoading(true)
      setInterval(function(){ setButtonLoading(false) }, 3000);
      setStart(!start)
    }

    useEffect(() => {
        
        // const socketio = io("http://localhost:5000")
        if(!start){
          setSocket(null)
        }
        else if(start == true){
          setSocket(io("http://localhost:5000"))
          
          // setSocket(io())
          // // const socket = io("http://localhost:5000")
          // console.log('taking in ')
          // socketio.on("newData", (data) => {
          // setArray(prevArray => [...prevArray, data])
          //   console.log(data)
          // })
        }
    }, [start])

    useEffect(()=>{
      const messageListener = (data) => {
        setArray(prevArray => [...prevArray, data])
            console.log(data)
      };
      if(socket!=null){
        socket.on('newData', messageListener)
      return () => {
        socket.off('newData', messageListener);
      };
      }
      
    },[socket])

    return ( 
        <div style={{justifyContent:'center', width:'100%', position:'relative', marginTop:'0px'}}>
          {array.length}
          {`${start}`}
            {/* <div style={{paddingLeft:'20px', paddingRight:'20px'}}>
            <div style={{margin: 'auto', color: 'white', fontWeight:'bold', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', height:'70px', width:'100%', borderRadius:'20px', marginBottom:'-80px', backgroundColor:'#5a65ea', fontSize:'20px', position:'relative', zIndex:'1', boxShadow:'0px 0px 20px 1px #5a65ea' }}>
                All Sessions <CollectionPlay style={{marginLeft:'10px'}}/>
            </div>
            </div> */}
        <div style={{borderRadius:'20px', overflow:'hidden',  boxShadow: '0px 0px 20px 1px #202225', marginTop:'20px', backgroundColor:'#3A3C41'}}>
        <Spin spinning={loading} delay={500} size="large">
        <div style={{overflow:'scroll', borderRadius:'20px', backgroundColor:'#3A3C41', padding:'20px', marginTop:'0px'}} 
        >
            <div style={{marginLeft:'10px', fontSize:'20px', marginBottom:'10px', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <div style={{display:'flex', alignItems:'center', color:'white'}}>All Sessions <CollectionPlay style={{marginLeft:'10px'}}/></div>
                <Button onClick={handleCLick} type="primary" className="new-session"><PlusCircleOutlined /> New Session <Spin indicator={<LoadingOutlined style={{marginLeft:'10px', color:'white'}}/>} spinning={buttonLoading}/></Button>
              </div>
            <Table 
            pagination={false}
            columns={columns} 
            dataSource={dummy.data} />
        </div>
        </Spin>
        </div>
        
        </div>
     );
}
 
export default Authorisation(Session);


