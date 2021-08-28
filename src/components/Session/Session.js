import { Table, Tag, Space, Card, Avatar } from 'antd';
import * as dummy from './dummydata'
import './styles.css'
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
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
    return ( 
        <div style={{borderRadius:'20px', backgroundColor:'#3A3C41', padding:'20px', boxShadow: '0px 0px 20px 1px #202225'}} 
        >
            <div style={{marginLeft:'10px', fontSize:'20px', marginBottom:'10px', display:'flex', flexDirection:'row', alignItems:'center'}}>All Sessions <CollectionPlay style={{marginLeft:'10px'}}/></div>
            <Table 
            pagination={false}
            columns={columns} 
            dataSource={dummy.data} />
        </div>
            
        
     );
}
 
export default Session;


