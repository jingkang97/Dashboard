import React from 'react';
import { Table, Tag, Space, Avatar, Spin } from 'antd';
import * as dummy from './dummydata'
import './styles.css'
import { UserOutlined, AntDesignOutlined,LoadingOutlined } from '@ant-design/icons';
import { CollectionPlay } from 'react-bootstrap-icons';


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
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
        <>
          {tags.map(tag => (
            <Tag color="pink" style={{backgroundColor:"transparent", color:'white'}} key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )
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
    const [loading, setLoading] = React.useState(true)
    const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

    setInterval(function(){ setLoading(false) }, 3000);
    
    return ( 
        <div style={{justifyContent:'center', width:'100%', position:'relative', marginTop:'20px'}}>
            <div style={{paddingLeft:'20px', paddingRight:'20px'}}>
            <div style={{margin: 'auto', color: 'white', fontWeight:'bold', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', height:'100px', width:'100%', borderRadius:'20px', marginBottom:'-80px', backgroundColor:'#5a65ea', fontSize:'20px', position:'relative', zIndex:'1', boxShadow:'0px 0px 20px 1px #5a65ea' }}>
                All Sessions <CollectionPlay style={{marginLeft:'10px'}}/>
            </div>
            </div>
            
       
        <div style={{borderRadius:'20px', overflow:'hidden',  boxShadow: '0px 0px 20px 1px #202225', marginTop:'20px', backgroundColor:'#3A3C41'}}>
        <Spin spinning={loading} delay={500} size="large">
        
        <div style={{overflow:'scroll', borderRadius:'20px', backgroundColor:'#3A3C41', padding:'20px', marginTop:'50px'}} 
        >
            {/* <div style={{marginLeft:'10px', fontSize:'20px', marginBottom:'10px', display:'flex', flexDirection:'row', alignItems:'center'}}>
                All Sessions <CollectionPlay style={{marginLeft:'10px'}}/>
                </div> */}
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
 
export default Session;


