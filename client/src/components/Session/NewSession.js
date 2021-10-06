import React, {useState, useEffect} from 'react';
import { Table, Avatar, Tag, Input, Spin, Row, Col, Button} from 'antd'
import {UserOutlined, SyncOutlined,CloseOutlined} from '@ant-design/icons';
import { AiOutlineWarning, AiOutlineLike, AiOutlineUser } from 'react-icons/ai';
import {IoIosSync} from 'react-icons/io'
import {io} from 'socket.io-client'
import * as api from '../api/index'
import './styles.css'
import Analytics from './Analytics'
import moment from 'moment'
import Modal from 'react-modal';

const NewSession = ({openModal}) => {
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
  const [array, setArray] = useState([])
  const [emg, setEmg] = useState([])
  const [syncDelay, setSyncDelay] = useState([])
  const [session, setSession] = useState([])
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)

  const [isModalVisible, setIsModalVisible] = useState(false)

  const [startSession, setStartSession] = useState(false)
  const [stop, setStop] = useState(false)
  const [select, setSelect] = useState(true)
  const [postLoading, setPostLoading] = useState(false)
  const [sendPost, setSendPost] = useState(false)

  const [danceScore, setDanceScore] = useState(0)
  const [moveChart, setMoveChart] = useState([])
  const [groupDanceScore, setGroupDanceScore] = useState([])
  const [groupPositionScore, setGroupPositionScore] = useState([])
  const [evaluation, setEvaluation] = useState(null)

  const startSessionHandler = (e) => {
    if(sessionName == ''){
      alert('Please fill in the name first!')
    }
    else if(rows.length == 0){
      alert('Please choose at least one user')
    }
    else if(rows.length > 3){
      alert('Please choose at most three users')
    }
    else{
      let current_time = moment()
      setStartTime(current_time)
      setSelect(false)
      setStartSession(true)
    }
  }

  const getEvaluation = async() => {
    try {
        await api.getEval().then(data => {
          console.log(data.data.data)
          setEvaluation(data.data.data)
        })
      } catch (error) {
        alert(error)
      }
}

const calculateIndividualDance = () => {
  let userDance = []
  let moveChartList = []

  for(let i = 0; i < session.length; i += 1){
      userDance.push({username: session[i].username, userId: session[i].userId, movePercent: '0%', positionPercent:'0%'})
      moveChartList.push({username: session[i].username, userId: session[i].userId, dataMove: [{name: 'correct', value: 0}, {name: 'wrong', value: 0}], dataPosition: [{name: 'correct', value: 0}, {name: 'wrong', value: 0}]})
  }
  
  let totalMoveScore = 0
  let totalCorrectMoveScore = 0
  let totalWrongMoveScore = 0

  let totalPositionScore = 0
  let totalCorrectPositionScore = 0
  let totalWrongPositionScore = 0


  let moveScore = 0
  let moveTotal = 0
  let wrongMoveScore = 0

  for(let j = 0; j < session.length; j += 1){
      moveScore = 0
      moveTotal = 0
      wrongMoveScore = 0
      for(let i = 0; i < session[j].session.length; i++){
          moveTotal += 1
          totalMoveScore += 1
          if(session[j].session[i].danceMove == evaluation.datas[i].danceMove){
              moveScore += 1
              totalCorrectMoveScore += 1
                    
          }
          else{
              wrongMoveScore += 1
              totalWrongMoveScore += 1
          }
      }           
      userDance[j].movePercent = ((moveScore/moveTotal)*100).toFixed(1)              
      moveChartList[j].dataMove[0].value = parseFloat(((moveScore/moveTotal)*100).toFixed(1))
      moveChartList[j].dataMove[1].value = parseFloat(((wrongMoveScore/moveTotal)*100).toFixed(1))
  }
  
  let danceScore = 0
  let danceTotal = 0
  let wrongDanceScore = 0
  for(let j = 0; j < session.length; j += 1){
      danceScore = 0
      danceTotal = 0
      wrongDanceScore = 0
      for(let i = 0; i < session[j].session.length; i++){
              danceTotal += 1
              totalPositionScore += 1
              let temp = evaluation.datas[i].position.split(',')
              if(temp.indexOf(session[j].session[i].position) + 1 == session[j].session[i].position){
                  danceScore += 1
                  totalCorrectPositionScore += 1
              }
              else{
                  wrongDanceScore += 1
                  totalWrongPositionScore += 1
                  moveChartList[j].dataPosition[1].value = parseFloat((wrongDanceScore).toFixed(1))
              }
          }
      moveChartList[j].dataPosition[1].value = parseFloat(((wrongDanceScore/danceTotal)*100).toFixed(1))
      userDance[j].positionPercent = ((danceScore/danceTotal)*100).toFixed(1)
      moveChartList[j].dataPosition[0].value = parseFloat(((danceScore/danceTotal)*100).toFixed(1))
  }
  setMoveChart(moveChartList)
  setDanceScore(userDance)

  let totalWrongMoveScorePercentage = parseFloat(((totalWrongMoveScore/totalMoveScore)*100).toFixed(1))
  let totalCorrectMoveScorePercentage = parseFloat(((totalCorrectMoveScore/totalMoveScore)*100).toFixed(1))

  let totalWrongPositionScorePercentage = parseFloat(((totalWrongPositionScore/totalPositionScore)*100).toFixed(1))
  let totalCorrectPositionScorePercentage = parseFloat(((totalCorrectPositionScore/totalPositionScore)*100).toFixed(1))

  setGroupDanceScore([{name: 'correct', value: totalCorrectMoveScorePercentage},{name: 'wrong', value: totalWrongMoveScorePercentage}])
  setGroupPositionScore([{name: 'correct', value: totalCorrectPositionScorePercentage},{name: 'wrong', value: totalWrongPositionScorePercentage}])
}

  const endSessionHandler = async(e) => {
    e.preventDefault()
    try{
      let current_time = moment()
      setEndTime(current_time)
      setPostLoading(true)

      let difference = 0
      let start_time = startTime
      let end_time = current_time
      difference = end_time.diff(start_time)
      let duration = moment.utc(difference).format("mm:ss")

      var tired = Math.max(...emg.map(o => o.emg)) >= 3
      const body = {
        sessionName: sessionName,
        owner: JSON.parse(localStorage.getItem('profile'))?.username,
        users: session,
        numberOfUsers: session.length ,
        syncDelay: syncDelay,
        emg: emg,
        startTime: startTime.format("h:mm:ss A"),
        endTime: moment().format("h:mm:ss A"),
        groupDanceScore: groupDanceScore,
        groupPositionScore: groupPositionScore,
        individualDanceScore: danceScore,
        individualMoveScore: moveChart,
        tired: tired,
        duration: duration
        // tired: , - calculate percentage of times emg hit above 3
        // duration: moment(startTime).format("h:mm:ss A"), - average, all duration add up/number of durations

      }

      var userList = []
      for(var i = 0; i < session.length; i++){
        userList.push(session[i].username)
      }

      const test = {
            username: userList,
            session: body
      }
      await api.addUserSession(test).then((data)=>{
        api.postSession(body).then((data)=>{
          // alert(data)
          close()    
          setPostLoading(false)
        })
      })
      // await api.postSession(body).then((data)=>{
      //   // alert(data)
      //   console.log(data)
      //   close()    
      //   setPostLoading(false)
      // })
    }catch(e){
      console.log(e)
    }
  }

  const close = (e) => {
    setSelect(true)
    setStartSession(false)
    setIsModalVisible(false)
    setStartSession(false)
    setStop(false)
    setSendPost(false)
    // reset all datas
    setRows([])
    setSessionName('')
    setSession([])
    setArray([])
    setEmg([])
    setSyncDelay([])

  }

  const handleGetResults = (e) => {
    setStartSession(false)
    setStop(true)
    getEvaluation()

  }

  const handleSessionNameChange = (e) => {
      setSessionName(e.target.value)
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
      if(evaluation!=null){
        calculateIndividualDance()
      }
    }, [evaluation])
 
    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
      if(!startSession){
        setSocket(null)
      }
      else if(startSession == true){
        // setStartTime(Date.now())
        setSocket(io("http://localhost:5000"))
      }
    }, [startSession])

    useEffect(() => {
      console.log(session)
    },[session])

    useEffect(()=>{
      if(openModal == true){
        setIsModalVisible(true)
      }
    },[openModal])

    useEffect(()=>{
      const messageListener = (data) => {
        // set start time
        setSession(prevSess => prevSess.map(el => (el.userId == data.userId ? {...el,session:[...el.session, data]} : el)))        
        setArray(prevArray => [...prevArray, data])
        let current_time = moment().format("h:mm:ss A")
        if(data.hasOwnProperty('emg')){
          setEmg(prevArray => [...prevArray, {emg:data.emg, time: current_time}])
        }
        if(data.hasOwnProperty('syncDelay')){
          setSyncDelay(prevArray => [...prevArray, {sync: data.syncDelay, time: current_time}])
        }
        
        console.log(data)
      };
      if(socket!=null){
        socket.on('newData', messageListener)
      return () => {
        socket.off('newData', messageListener);
      };
      }
      
    },[socket])

    useEffect(() => {
      if(stop){
        setEndTime(Date.now())
      }
     
    }, [stop])

    return ( 
      <Modal 
           isOpen={isModalVisible}
          style={{
            content: {
              backgroundColor:'#3A3C41',
              border:'solid 1px #3A3C41',
              borderRadius:'20px',
              padding:'0px'
              // paddingBottom:'30px',
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.45)'
            }}}
           contentLabel="Example Modal"
          >
          <Spin style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}} spinning={postLoading} size="large">
          <Button type="primary" style={{marginTop:'10px', background:'grey', border:'1px solid grey',marginRight:'10px', position:'absolute', right:'0', top:'0'}} shape="circle" icon={<CloseOutlined />} size='big' onClick={close}/>

        <div style={{height:'100%', width:'100%', padding:'20px'}}>
          {console.log(emg)}
            {startSession ? 
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
                                 {item.session.length ? item.session[item.session.length - 1].danceMove : '?'}
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
                      {emg.length ? (Number(emg[emg.length-1].emg) > 3 ? <div className="tired"><AiOutlineWarning style={{ filter: 'drop-shadow(1px 1px 20px red)', fontSize:'40px'}}/>Take a break!</div> : <div className="ok"><AiOutlineLike style={{ filter: 'drop-shadow(1px 1px 20px white)', fontSize:'40px', color:'white', marginRight:'10px'}}/>Keep Going!</div> ) : <div style={{fontSize:'30px', color:'white'}}>?</div>}
                      {emg.length ? (Number(emg[emg.length-1].emg) > 3 ? <div className="fatigue">Your muscle fatigue level is high</div> : <div className="fatigue">Your muscle fatigue level is normal</div> ) : <div style={{fontSize:'30px'}}>Get ready...</div>}
                      {/* {emg.length ? (emg[emg.length-1] =='tired' ? <div className="tired"><AiOutlineWarning style={{ filter: 'drop-shadow(1px 1px 20px red)', fontSize:'40px'}}/>Take a break!</div> : <div className="ok"><AiOutlineLike style={{ filter: 'drop-shadow(1px 1px 20px white)', fontSize:'40px', color:'white', marginRight:'10px'}}/>Keep Going!</div> ) : 'Get ready ...'}
                      {emg.length ? (emg[emg.length-1] =='tired' ? <div className="fatigue">Your muscle fatigue level is high</div> : <div className="fatigue">Your muscle fatigue level is normal</div> ) : 'Get ready ...'} */}
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
                          
                          {syncDelay.length ?  (syncDelay[syncDelay.length-1].sync == 0 ? 
                          <div className="perfectSync">Perfect Sync</div> : (
                            syncDelay[syncDelay.length-1].sync > 0 && syncDelay[syncDelay.length-1].sync <= 0.5 ? 
                            <div className="okSync">Almost Perfect Sync</div> : (syncDelay[syncDelay.length-1].sync > 0.5 ? <div className="notSync">Please Match Up!</div> : null)
                            
                          )) : <div style={{fontSize:'30px'}}>Get Ready...</div>}
                          
                          <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                            Off By
                            <div style={{display:'flex', flexDirection:'column',height:'100%', background:'transparent', position:'relative', color:'white'}}>
                              <IoIosSync className="syncMove"/>
                              <div style={{position:'absolute', top: '50%', left:'50%', transform:'translate(-50%, -50%)',fontSize:'32px', fontWeight:'bold'}}>
                                {syncDelay.length ? 
                                <div>{syncDelay[syncDelay.length-1].sync}s </div> 
                                : '?'}
                                </div>
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
                        <Row gutter={[40]} style={{margin:'20px'}}>
                          {rows.map((item, number) => 
                              <Col key={number}>
                                {array.length ? null : <div className="blobempty">?</div>}
                                {session.map((item) => (item.session.length ? (item.session[item.session.length-1].position == number + 1 ?  
                                <div className={`blob${(rows.findIndex(x => x.userId == item.userId) + 1) == 1 ? 'one' : (rows.findIndex(x => x.userId == item.userId) + 1) == 2 ? 'two' : 'three'}`}>{rows.findIndex(x => x.userId == item.userId) + 1}</div>
                                  : null) : null))}
                                 </Col>
                          )}
                        </Row>
                    </div>
                  </Col>
                </Row>
                <div>
                </div>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-end', width:'100%', background:'transparent'}}><Button type="primary" style={{marginTop:'10px', marginRight:'10px'}} onClick={handleGetResults}>Get Results</Button></div>

            </div>
            : 
            null}
            {select ? 
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
                rowSelection ={{
                    onSelect:(record) => {
                    },
                    onChange: (keys, record) => {
                      setRows(record)
                      console.log(record)
                      setSession(record.map((item)=>({ username: item.username, userId: item.userId, userImage: item.image, session:[]})))
                      console.log(session)
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
            <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-end', width:'100%', background:'transparent'}}><Button type="primary" style={{marginTop:'10px', marginRight:'10px'}} onClick={startSessionHandler}>Start Session</Button></div>
            </div>
            : null}
            {
              stop ? 
              <div>
              <Analytics stop={stop} start={startTime} end={endTime} rows={rows} session={session} emg={emg} syncDelay={syncDelay} sendPost={sendPost}/>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-end', width:'100%', marginBottom:'0px', background:'transparent', height:'100%'}}><Button type="primary" style={{marginTop:'20px', marginRight:'20px', marginBottom:'20px'}} onClick={endSessionHandler}>End Session</Button></div>
              </div>
              : 
              null
            }
            
        </div>
        </Spin>
        </Modal>
     );
}
 
export default NewSession;