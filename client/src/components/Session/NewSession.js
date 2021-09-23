import React, {useState, useEffect} from 'react';
import { Table, Avatar, Tag, Space, Input, Spin, Row, Col} from 'antd'
import {UserOutlined, WarningOutlined } from '@ant-design/icons';
import { AiOutlineWarning, AiOutlineLike } from 'react-icons/ai';


import * as api from '../api/index'

import {io} from 'socket.io-client'

import './styles.css'
const NewSession = ({userList, test, start}) => {
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
  const [socket, setSocket] = useState(null)
  const [users, setUsers] = useState(null)
  const [sessionName, setSessionName] = useState('')
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState([])
  const [keys, setKeys] = useState([])
  const [positions, setPositions] = useState([])
  const [array, setArray] = useState([])
  const moves = ['dancemove1', 'dancemove2', 'dancemove3']
  const dancer_position = [1,2,3]
  const fatigue = ['tired', 'not_tired']
  const [changeMoves, setChangeMoves] = useState('Get ready...')
  const [changePositions, setChangePositions] = useState('Get ready...')
  const [tired, setTired] = useState(null)

  const handleSessionNameChange = (e) => {
      setSessionName(e.target.value)
  }
  const handlePositionsChange = (value, key) => {
    // setPositions([...positions, {position: value.target.value, key: key}])

    // if(positions.length){
    //   if(positions.find(o => o._key == key)){
    //     console.log('found')

    //   } 
    // }else{
    //   setPositions(...positions, value.target.value)
    // }
    console.log(value.target.value)
    console.log(key)
  } 

  const change = () => {
    setInterval(()=>{
      setChangeMoves(moves[Math.floor(Math.random()*moves.length)])
      setChangePositions(dancer_position[Math.floor(Math.random()*dancer_position.length)])
      setTired(fatigue[Math.floor(Math.random()*fatigue.length)])
    },5000)
    
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
        change()
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
          {/* {console.log(keys)} */}
          {console.log(positions)}
            {start ? 
            <div>
                {/* DASHBOARD */}
                <div style={{fontSize:'30px', color:'white', marginBottom:'20px'}}>
                {sessionName}

                </div>
                <Row gutter={[20, 20]} style={{width:'inherit', background:'transparent'}}>                
                {rows.map((item,index)=>{
                    return (
                      <Col md={rows.length == 1 ? 24 : (rows.length == 2 ? 12 : 8)}>
                      <div key={index}>
                          <div style={{width:'100%', height:'100%', backgroundColor:'#3A3C41', borderRadius:'10px', display:'flex', flexDirection:'column', alignItems:'center', boxShadow: '0px 0px 20px 1px #202225',}}>
                          
                          <div style={{display:'flex', flexDirection:'row', marginTop:'10px', justifyContent:'center', alignItems:'center', marginBottom:'10px'}}>
                            {/* <Avatar icon={<UserOutlined style={{fontSize:'30px', marginTop:'5px'}}/>} src={item.image} style={{height:'40px', width:'40px'}}/> */}
                            <div className={index+1 == 1 ? 'one': (index+1 == 2 ? 'two': 'three')}>{index + 1}</div>
                            <div style={{color:'white', marginBottom:'10px', fontSize:'15px', marginTop:'10px', marginLeft:'10px', fontSize:'20px'}}>{item.username}</div>

                          </div>
                            <Row gutter={10} style={{width:'inherit', paddingBottom:'10px'}}>
                              <Col md={12}>
                              
                              <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                <div style={{color:'#9BA6B2', fontSize:'20px'}}> 
                                  Detected Move
                                </div>
                                <div style={{fontSize:'30px', color:'white'}}>
                                  {changeMoves}
                                </div>
                                </div>
                              </Col>  
                              <Col md={12}>
                              <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                <div style={{color:'#9BA6B2', fontSize:'20px'}}> 
                                  Expected Move
                                </div>
                                <div style={{fontSize:'30px', color:'#FF6D98', fontWeight:'bold', textShadow:'0 0 10px 10px #5a64ea'}}>
                                  {changeMoves}
                                </div>
                                </div>
                              </Col>  
                            </Row>   
                            
                          </div>
                      </div>
                    </Col>
                    )
                })}
                </Row>
                <Row style={{marginTop:'20px'}}>
                  <Col md={24}>
                  <div style={{width:'100%', height:'100%', backgroundColor:'#3A3C41', borderRadius:'10px', display:'flex', flexDirection:'column', alignItems:'center', boxShadow: '0px 0px 20px 1px #202225', padding:'10px'}}>
                      <div >
                        Fatigue Check
                      </div>
                      {tired == 'tired' ? <div className="tired"> <AiOutlineWarning style={{ filter: 'drop-shadow(1px 1px 20px red)', fontSize:'40px'}}/> Time to take a break!</div>  : (tired == 'not_tired' ? <div style={{fontSize:'50px', display:'flex', flexDirection:'row', alignItems:'center'}}><AiOutlineLike style={{ filter: 'drop-shadow(1px 1px 20px white)', fontSize:'40px', color:'white', marginRight:'10px'}}/><div className="notTired">Keep Going!</div></div> : null)}
                      {tired == 'tired' ? <div className="fatigue">Your muscle fatigue level is high</div>  : (tired == 'not_tired' ? <div  className="fatigue">Your muscle fatigue level is normal</div>: <div style={{fontSize:'30px'}}>Get Ready ...</div>)}

                    </div>
                  </Col>
                </Row>
                <Row gutter={[30]}  style={{marginTop:'20px'}}>
                  <Col md={12}>
                  <div className='expectedPosition'>
                      <div>
                          Detected Position
                        </div>
                        <div class="blob white">1</div>

                    </div>
                  </Col>
                  <Col md={12}>
                  <div style={{width:'100%', height:'100%', backgroundColor:'#3A3C41', borderRadius:'10px', display:'flex', flexDirection:'column', alignItems:'center', boxShadow: '0px 0px 20px 1px #202225', padding:'10px'}}>
                      <div >
                        Expected Position
                      </div>

                    </div>
                  </Col>
                </Row>
                <div>
                    {/* wearable id */}
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