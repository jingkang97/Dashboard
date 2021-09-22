import React, {useState, useEffect} from 'react';
import { Table, Avatar, Tag, Space, Input, Spin} from 'antd'
import {UserOutlined} from '@ant-design/icons';

import * as api from '../api/index'

import {io} from 'socket.io-client'


const NewSession = ({userList, test, start}) => {
  const [socket, setSocket] = useState(null)
  // const [start, setStart] = useState(false)

  const columns = [
    {
      title: 'User',
      dataIndex: 'username',
      key: 'name',
      render: text => <div style={{color:'white', display:'flex', flexDirection:'row', alignItems:'center'}}><div style={{width:'100%'}}>{text} </div> </div>,
    },
    {
      dataIndex: 'image',
      key: 'image',
      render: text => <Avatar src={text}/>

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
            </>
      },
    
    {
        title: 'Position',
        render: (text, record, key) =>
            <Input 
            // disabled={rows.find(o => o.key == key) ? false : true}
            disabled = {keys.find(o => o == record._id) ? false : true}
            onChange={(value)=>{handlePositionsChange(value, key)}}
            style={{width:'100%', borderRadius:'8px', border:'transparent', background:'#2f3136'}}
            // placeholder={key} 
            placeholder='1, 2, 3, ...'
            type="text"/>
          
      },

     {
        title: 'Expected Moves',
        render: (text, record) =>
            <Input 
            disabled = {keys.find(o => o == record._id) ? false : true}
            style={{width:'100%', borderRadius:'8px', border:'transparent', background:'#2f3136'}}
            placeholder="expected moves" 
            type="text"/>
          
      },
  ];
    const [users, setUsers] = useState(null)
    const [sessionName, setSessionName] = useState('')
    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState([])
    const [keys, setKeys] = useState([])
    const [positions, setPositions] = useState([])
    const [array, setArray] = useState([])

    const handleSessionNameChange = (e) => {
        setSessionName(e.target.value)
    }
    const handlePositionsChange = (value, key) => {
      console.log(value.target.value)
      console.log(key)
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
    // const onSelectChange = selectedRowKeys => {
    //     console.log('selectedRowKeys changed: ', selectedRowKeys);
    //     setRows(...rows, selectedRowKeys)
    //     // this.setState({ selectedRowKeys });
    //   };
    // const rowSelection = {
    //     r,
    //     onChange: onSelectChange,
    //   };
    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
      if(!start){
        setSocket(null)
      }
      else if(start == true){
        setSocket(io("http://localhost:5000"))
        
      }
    }, [start])

    useEffect(()=>{
      const messageListener = (data) => {
        // if(data.beetleId == '1234')
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
        <div style={{height:'100%', width:'100%'}}>
          {/* {rows.length} */}
          {console.log(keys)}
            {start ? 
            <div>
                DASHBOARD
                {sessionName}
                {/* array of users selected, three divs */}
                <div>
                    {/* user selected */}
                    {/* position */}
                    {/* expected dance move now */}
                    {/* wearable id */}
                    {/* fatigue check */}
                    {array.length}
                </div>
            </div>
            : 
            <div>

            <div>
                <h3 style={{color:'white'}}>New Session</h3>
            </div>
            <Input name="name" size="large" 
            value={sessionName}
            onChange={handleSessionNameChange}
            placeholder="session name" 
            style={{width:'100%', marginTop:'10px', borderRadius:'8px', border:'transparent', background:'#2f3136', marginBottom:'0px'}}
            />
            <div style={{borderRadius:'20px', overflow:'hidden',  boxShadow: '0px 0px 20px 1px #202225', marginTop:'20px', backgroundColor:'#3A3C41'}}>
            <Spin spinning={loading} delay={500} size="large">

            <div style={{borderRadius:'20px', backgroundColor:'#3A3C41', width:'100%', height:'100%', marginTop:'20px', marginBottom:'20px'}}>

            <div style={{display:'flex', alignItems:'center', marginTop:'10px', marginLeft:'20px'}}>
                All Users <UserOutlined style={{marginLeft:'10px'}}/>
            </div>
            <Table 
                // rowSelection={true}
                rowSelection ={{
                    onSelect:(record) => {
                        // setRows(record)
                        // setRows(...rows, record)
                        console.log({record})
                    },
                    onChange: (keys, record) => {
                      setRows(record)
                      setKeys(keys)
                        // console.log(keys)
                        // setRows(...rows, record)
                        console.log(record)
                        
                    }
                }}
                style={{margin:'10px'}}
                pagination={false}
                columns={columns} 
                dataSource={users} 
                rowKey='_id'
                />

            </div>
            </Spin>

            </div>
            </div>
            
            }
            

        </div>
     );
}
 
export default NewSession;