import React, {useEffect, useState} from 'react';
import { Table, Tag, Space, Avatar, Spin, Button, Col, Row } from 'antd';

import { UserOutlined, AntDesignOutlined,LoadingOutlined, PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { AppIndicator, CollectionPlay } from 'react-bootstrap-icons';
import { VscDebugStart, VscDebugStop } from 'react-icons/vsc';
import {io} from 'socket.io-client'

import * as dummy from './dummydata'
import './styles.css'
import Authorisation from '../Authorisation/Authorisation'
import NewSession from './NewSession'
import * as api from '../api/index'
import Modal from 'react-modal';
import Analytics from './Analytics'


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
          <Avatar src={u.userImage} >{u.userImage}</Avatar>
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
      dataIndex: 'sessionName',
      key: 'sessionName',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=>{handleView(record)}}>
            View Analytics
          </a>
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

    const [openView, setOpenView] = useState(false)
    const [emg, setEmg] = useState([])
    const [syncDelay, setSyncDelay] = useState([])
    const [session, setSession] = useState([])
    const [rows, setRows] = useState([])
    const [sessionInformation, setSessionInformation] = useState(null)
    
    // const Analytics = ({stop, rows, session, emg, syncDelay}) => {

    const handleView = (record) => {
      // alert(text)
      console.log(record)
      setOpenView(true)
      setEmg(record.emg)
      setSyncDelay(record.syncDelay)
      setSession(record.users)
      setRows(record.users)
      setSessionInformation(record)
    }
    const handleClick = (event) =>{
      setIsModalVisible(true)
      setInterval(()=>{setIsModalVisible(false)},1)

    }

    const closeModal = (event) => {
      setOpenView(false)
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
           <Modal 
           isOpen={openView}
          style={{
            content: {
              backgroundColor:'#3A3C41',
              border:'solid 1px #3A3C41',
              borderRadius:'20px',
              padding:'20px'
              // paddingBottom:'30px',
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.45)'
            }}}
           contentLabel="Example Modal"
          >
            <div style={{display:'flex', flexDirection:'row', position:'relative'}}>
            <Button type="primary" style={{marginTop:'10px', background:'grey', border:'1px solid grey',marginRight:'10px', position:'absolute', right:'0', top:'0'}} shape="circle" icon={<CloseOutlined />} size='big' onClick={closeModal}/>
            </div>
            {sessionInformation ? 
              <div>
                <div style={{color:'white', fontSize:'40px', fontWeight:'bold'}}>{sessionInformation.sessionName}</div>
                <Row gutter={[20, 20]} style={{width:'inherit', background:'transparent', marginTop:'20px', marginBottom:'20px'}}>                
                <Col md={8}>
                    <div style={{width:'100%', height:'100%', backgroundColor:'#3A3C41', borderRadius:'10px', display:'flex', flexDirection:'row', alignItems:'center',justifyContent:'space-evenly', boxShadow: '0px 0px 20px 1px #202225', fontSize:'30px', padding:'30px'}}>
                    <UserOutlined style={{fontSize:'100px'}}/>

                      <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                        Users
                        <Avatar.Group>{sessionInformation.users.map((u)=>{return(
                            <Avatar style={{height:'50px', width:'50px'}} src={u.userImage} >{u.userImage}</Avatar>
                          )
                            }
                          )}</Avatar.Group>
                        {/* <div style={{color:'white'}}>{sessionInformation.startTime}</div> */}
                        {/* <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:'10px'}}>
                          {sessionInformation.users.map((u)=>{return (
                            <Tag color='pink' style={{background:'transparent', color:'pink', fontSize:'30px'}}>
                                {u.username}
                            </Tag>
                          
                          )})} 
                          </div> */}
                      </div>
                      
                    </div>

                  </Col>

                <Col md={8}>
                    <div style={{width:'100%', height:'100%', backgroundColor:'#3A3C41', borderRadius:'10px', display:'flex', flexDirection:'row', alignItems:'center',justifyContent:'space-evenly', boxShadow: '0px 0px 20px 1px #202225', fontSize:'30px', padding:'30px'}}>
                    <VscDebugStart style={{fontSize:'100px'}}/>

                      <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                        Started at 
                        <div style={{color:'white'}}>{sessionInformation.startTime}</div>
                      </div>
                      
                    </div>

                  </Col>
                  <Col md={8}>
                    <div style={{width:'100%', height:'100%', backgroundColor:'#3A3C41', borderRadius:'10px', display:'flex', flexDirection:'row', alignItems:'center',justifyContent:'space-evenly', boxShadow: '0px 0px 20px 1px #202225', fontSize:'30px', padding:'30px'}}>
                    <VscDebugStop style={{fontSize:'100px'}}/>

                      <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                        Ended at 
                        <div style={{color:'white'}}>{sessionInformation.endTime}</div>
                      </div>
                      
                    </div>

                  </Col>
                  </Row>
                  </div>
            :null}

            <Analytics stop={true} rows={rows} session={session} emg={emg} syncDelay={syncDelay}/>
            
          </Modal>
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