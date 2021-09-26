import React, {useState, useEffect} from 'react';
import { Table, Avatar, Tag, Input, Spin, Row, Col} from 'antd'
import {UserOutlined, SyncOutlined} from '@ant-design/icons';
import { AiOutlineWarning, AiOutlineLike, AiOutlineUser } from 'react-icons/ai';
import {IoIosSync} from 'react-icons/io'
import {io} from 'socket.io-client'
import * as api from '../api/index'
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
  const [testPosition, setTestPosition] = useState([1,2,3])
  const fatigue = ['tired', 'not_tired']
  const [changeMoves, setChangeMoves] = useState('Get ready...')
  const [changePositions, setChangePositions] = useState('Get ready...')
  const [tired, setTired] = useState(null)
  
  const [session, setSession] = useState([])

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

    useEffect(() => {
      console.log(session)
    },[session])


    useEffect(()=>{
      const messageListener = (data) => {
        // let tempObj = []
        setSession(prevSess => prevSess.map(el => (el.userId == data.userId ? {...el,session:[...el.session, data]} : el)))

        // for(let i = 0; i < session.length; i ++){
        //   if(session[i].userId == data.userId){
        //     // let tempObj = session[i].session
        //     // setSession(prevSess => [...prevSess, data])


        //     // tempObj.session.push(data)
        //     // setSession(tempObj)
        //     // console.log(session)
        //     // console.log(tempObj)
        //   }
          
        // }
        // console.log(session)
        // setSession()
        
        // setArray(prevArray => [...prevArray, data])
            // console.log(data)
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
          {/* {console.log(session.length)} */}
          {/* {rows.length} */}
          {/* {console.log(keys)} */}
          {/* {console.log(positions)} */}
            {start ? 
            <div>
                {/* DASHBOARD */}
                <div style={{fontSize:'30px', color:'white', marginBottom:'10px'}}>
                Session: {sessionName}

                </div>
                <Row gutter={[20, 20]} style={{width:'inherit', background:'transparent'}}>                
                {session.map((item,index)=>{
                    return (
                      <Col md={rows.length == 1 ? 24 : (rows.length == 2 ? 12 : 8)}>
                      <div key={index}>
                          <div style={{width:'100%', height:'100%', backgroundColor:'#3A3C41', borderRadius:'10px', display:'flex', flexDirection:'column', alignItems:'center', boxShadow: '0px 0px 20px 1px #202225',}}>
                          <div style={{display:'flex', flexDirection:'row', marginTop:'10px', justifyContent:'center', alignItems:'center', marginBottom:'10px'}}>
                            <div className={index+1 == 1 ? 'one': (index+1 == 2 ? 'two': 'three')}>{index + 1}</div>
                            <div style={{color:'white', marginBottom:'10px', fontSize:'15px', marginTop:'10px', marginLeft:'10px', fontSize:'20px'}}>{item.username}
                            {item.userId}
                            </div>
                          </div>
                            <Row gutter={10} style={{width:'inherit', paddingBottom:'10px'}}>
                              <Col md={24}>
                              
                              <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                <div style={{color:'#9BA6B2', fontSize:'20px'}}> 
                                  Detected Move
                                </div>
                                <div style={{fontSize:'30px', color:'white'}}>
                                {/* {session.length } */}
                                 {item.session.length ? item.session[item.session.length - 1].danceMove : '?'}
                                  {/* {session.length ? () : '?'} */}
                                  {/* {array.length ? array[array.length-1].danceMove: '?'} */}
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
                      {(array.length ? array[array.length-1].emg: 1) == 'tired' ? <div className="tired"> <AiOutlineWarning style={{ filter: 'drop-shadow(1px 1px 20px red)', fontSize:'40px'}}/> Time to take a break!</div>  : ((array.length ? array[array.length-1].emg: 1) == 'ok' ? <div style={{fontSize:'50px', display:'flex', flexDirection:'row', alignItems:'center'}}><AiOutlineLike style={{ filter: 'drop-shadow(1px 1px 20px white)', fontSize:'40px', color:'white', marginRight:'10px'}}/><div className="notTired">Keep Going!</div></div> : null)}
                      {(array.length ? array[array.length-1].emg: 1) == 'tired' ? <div className="fatigue">Your muscle fatigue level is high</div>  : ((array.length ? array[array.length-1].emg: 1) == 'ok' ? <div  className="fatigue">Your muscle fatigue level is normal</div>: <div style={{fontSize:'30px'}}>Get Ready ...</div>)}

                    </div>
                  </Col>
                </Row>
                <Row gutter={[30]}  style={{marginTop:'20px'}}>
                <Col md={12}>
                  <div className='expectedPosition'>
                      <div >
                        Synchronisation Delay
                      </div>
                      <Row gutter={40} style={{margin:'0px', width:'100%'}}>
                        <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-around', width:'inherit', background:'transparent'}}>
                          <div className="syncStatus">
                            Well Synchronised!
                            {/* Perfect Sync! */}
                            {/* Watch your speed! */}
                            {/*  */}
                          </div>
                          <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                            Off By
                            <div style={{display:'flex', flexDirection:'column',height:'100%', background:'transparent', position:'relative', color:'white'}}>
                              <IoIosSync className="syncMove"/>
                              <div style={{position:'absolute', top: '50%', left:'50%', transform:'translate(-50%, -50%)',fontSize:'32px', fontWeight:'bold'}}>0.5s</div>
                            </div>
                          </div>
                          </div>
                      </Row>
                          
                    </div>
                  </Col>
                  <Col md={12}>
                  <div className='detectedPosition'>
                      <div style={{color:'white'}}>
                          Detected Position
                        </div>
                        <Row gutter={40} style={{margin:'20px'}}>
                          {dancer_position.map((key, number) => 
                              <Col key={number}>
                              {number+1}
                              <div className={`blob${(array.length ? array[array.length-1].position: '?') == 1 ? 'one' : ((array.length ? array[array.length-1].position: '?') == 2 ? 'two': ((array.length ? array[array.length-1].position: '?') == 3 ? 'three' : 'empty'))}`}>{array.length ? array[array.length-1].position: '?'}</div>
                            </Col>
                          )}
                        </Row>
                    </div>
                  </Col>
                  
                </Row>
                <div>
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
                        // setSession(record)
                    },
                    onChange: (keys, record) => {
                      // setSession(...session, {userId: record.userId, session:[]})
                      setRows(record)
                      setKeys(keys)
                        // console.log(keys)
                        // setRows(...rows, record)
                        console.log(record)
                        setSession(record.map((item)=>({username: item.username, userId: item.userId, session:[]})))
                        // record.map((item) => {
                        //   setSession([{username: item.username, userId: item.userId, session: []}])
                        // })
                        console.log(session)
                        // console.log(record)

                        // console.log(session)
                        
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