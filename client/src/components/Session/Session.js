import React, {useEffect, useState} from 'react';
import { Table, Tag, Space, Avatar, Spin, Button } from 'antd';

import { UserOutlined, AntDesignOutlined,LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { CollectionPlay } from 'react-bootstrap-icons';
import {io} from 'socket.io-client'

import * as dummy from './dummydata'
import './styles.css'
import Authorisation from '../Authorisation/Authorisation'
import NewSession from './NewSession'
import Modal from 'react-modal';

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
    const [loading, setLoading] = React.useState(false)    
    const [buttonLoading, setButtonLoading] = useState(false)
    const [array, setArray] = useState([])
    const [stop, setStop] = useState(false)
    const [start, setStart] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    

    const handleClick = (event) =>{
      setIsModalVisible(true)
    }


    const startSession = (event) =>{
      setStart(true)
    }
    const pauseSession = (event) =>{
      setStart(false)
    }

    

    return ( 
        <div style={{justifyContent:'center', width:'100%', position:'relative', marginTop:'0px'}}>
          <Modal 
           isOpen={isModalVisible}
          style={{
            content: {
              backgroundColor:'#3A3C41',
              border:'solid 1px #3A3C41',
              borderRadius:'20px'
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.45)'
            }}}
           contentLabel="Example Modal"
          >
            <div>
            <NewSession userList={null} test={array.length} start={start} />

            <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-end', width:'100%', background:'transparent', marginTop:'20px'}}>
                <Button type="primary" style={{marginTop:'10px', background:'transparent', marginRight:'10px'}} onClick={()=>{setIsModalVisible(false)}}> Cancel</Button>
                {start ? <Button type="primary" style={{marginTop:'10px', background:'grey', border:'1px solid grey',marginRight:'10px'}} onClick={startSession}>Back</Button> : null}

                {start ? null : <Button type="primary" style={{marginTop:'10px', marginRight:'10px'}} onClick={startSession}>Start Session</Button>}
                {start ?  <Button type="primary" style={{marginTop:'10px'}} onClick={pauseSession}>Stop Session</Button> : null}
              </div>
            </div>

          </Modal>
          
        <div style={{borderRadius:'20px', overflow:'hidden',  boxShadow: '0px 0px 20px 1px #202225', marginTop:'20px', backgroundColor:'#3A3C41'}}>
          <Spin spinning={loading} delay={500} size="large">
            <div style={{overflow:'scroll', borderRadius:'20px', backgroundColor:'#3A3C41', padding:'20px', marginTop:'0px'}}>
                <div style={{marginLeft:'10px', fontSize:'20px', marginBottom:'10px', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <div style={{display:'flex', alignItems:'center', color:'white'}}>All Sessions <CollectionPlay style={{marginLeft:'10px'}}/></div>
                    <Button onClick={handleClick} type="primary" className="new-session"><PlusCircleOutlined /> New Session <Spin indicator={<LoadingOutlined style={{marginLeft:'10px', color:'white'}}/>} spinning={buttonLoading}/></Button>
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


