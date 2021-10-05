import React, {useState, useEffect} from 'react';
import { Table, Avatar, Tag, Input, Spin, Row, Col, Button} from 'antd'
import {UserOutlined, SyncOutlined} from '@ant-design/icons';
import { AiOutlineWarning, AiOutlineLike, AiOutlineUser } from 'react-icons/ai';
import {IoIosSync} from 'react-icons/io'
import * as api from '../api/index'
import './styles.css'
import DoughnutChart from './DoughnutChart';
import SyncGraph from './SyncGraph';
import FatigueGraph from './FatigueGraph'
import moment from 'moment'

const Analytics = ({stop, rows, session, emg, syncDelay, start, end}) => {
    const [evaluation, setEvaluation] = useState(null)
    const [danceScore, setDanceScore] = useState(0)
    const [moveChart, setMoveChart] = useState([])
    const [syncDelayDisplay, setSyncDelayDisplay] = useState(0)
    const [groupDanceScore, setGroupDanceScore] = useState([])
    const [groupPositionScore, setGroupPositionScore] = useState([])

    const [tired, setTired] = useState(null)
    const [tiredDuration, setTiredDuration] = useState(null)
    const [tiredDurationMinutes, setTiredDurationMinutes] = useState(null)
    const [loading, setLoading] = useState(false)


    const calculateTired = () => {
        for(let i = 0; i < emg.length; i ++){
            if(emg[i].emg > 3){
                setTired(emg[i].time)
                calculateTiredDuration(emg[i].time)
                break;
            }
        }
    }

    const calculateTiredDuration = (tiredTime) => {
        let duration = 0
        let start = moment(emg[0].time, 'h:mm:ss A')
        let end = moment(tiredTime, 'h:mm:ss A')

        // duration = moment.duration(end.diff(start))
        duration = end.diff(start)
        // let seconds = duration.asSeconds().toFixed(2)

        let f = moment.utc(duration).format("mm:ss");

        // let minutes = duration.asMinutes().toFixed(2)
        // alert(emg[0].time)
        // alert(tiredTime)
        // alert(start)
        // alert(end)
        // alert(start, end, duration)
        setTiredDuration(f)
        // setTiredDurationMinutes(minutes)
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
    const calculateSyncDelay = () => {
        let count = 0;
        for(let i = 0; i < syncDelay.length; i++){
            // console.log(syncDelay[i].sync)
            count += parseFloat(syncDelay[i].sync)
            console.log(count)
        }
        
        if(syncDelay.length != 0){
            setSyncDelayDisplay((count/syncDelay.length).toFixed(1))
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

                // console.log('wrongscore', wrongMoveScore)
                // console.log('move', moveScore)
                // console.log('outside movetotal',moveTotal)
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


        // Group Scores
        let totalWrongMoveScorePercentage = parseFloat(((totalWrongMoveScore/totalMoveScore)*100).toFixed(1))
        let totalCorrectMoveScorePercentage = parseFloat(((totalCorrectMoveScore/totalMoveScore)*100).toFixed(1))

        let totalWrongPositionScorePercentage = parseFloat(((totalWrongPositionScore/totalPositionScore)*100).toFixed(1))
        let totalCorrectPositionScorePercentage = parseFloat(((totalCorrectPositionScore/totalPositionScore)*100).toFixed(1))

        setGroupDanceScore([{name: 'correct', value: totalCorrectMoveScorePercentage},{name: 'wrong', value: totalWrongMoveScorePercentage}])
        setGroupPositionScore([{name: 'correct', value: totalCorrectPositionScorePercentage},{name: 'wrong', value: totalWrongPositionScorePercentage}])
    }

    useEffect(()=>{
        if(evaluation != null){
            calculateIndividualDance()
        }
    },[evaluation])

    useEffect(() => {
        if(syncDelay != null){
            calculateSyncDelay()
        }
    }, [syncDelay])

    useEffect(() => {
       getEvaluation() 
    }, [stop])

    useEffect(() => {
       if(emg.length > 0){
           calculateTired()
       }
    }, [emg])

    return ( 
        <div style={{width:'100%', background:'transparent'}}>
            {/* {alert(syncDelayDisplay)} */}
            <div style={{fontSize:'30px', color:'white', marginBottom:'10px', fontWeight:'bold'}}>Analytics</div>
            {/* individual  */}
            <div style={{fontSize:'25px', color:'white', marginBottom:'10px'}}>Individual Analytics</div>
            <Row gutter={[20, 20]} style={{width:'inherit', background:'transparent'}}>                
                {danceScore ? danceScore.map((item,index)=>{
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
                                    Move Analytics
                                    </div>
                                    <div style={{fontSize:'15px', color:'white', position:'relative', width:'100%', height:'100%', background:'transparent', alignItems:'center', display:'flex', flexDirection:'column'}}>
                                    <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%', display:'flex', flexDirection:'column', alignItems:'center', fontWeight:'bold', justifyContent:'center', width:'100%'}}>
                                        <div>{item.movePercent}%</div>
                                        <div>Correct</div>
                                        {/* TODO */}
                                        {item.movePercent == 100.0 ? <div className="perfect">Perfect</div> : 
                                        (item.movePercent < 100.0 && item.movePercent >= 70.0 ? <div className="excellent">Excellent</div>:    
                                        (item.movePercent < 70.0 && item.movePercent >= 50.0 ? <div className="average">Average</div> : 
                                        (item.movePercent < 50.0 ? <div className="poor">Poor</div> : null)))
                                        } 
                                    </div>
                                    <DoughnutChart data={moveChart[moveChart.findIndex(x=> x.userId == item.userId)].dataMove}/>
                                    
                                    </div>
                                </div>
                              </Col>  
                            </Row>  
                            <Row gutter={10} style={{width:'inherit', paddingBottom:'10px'}}>
                                <Col md={24}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                    <div style={{color:'#9BA6B2', fontSize:'20px'}}> 
                                    Position Analytics
                                    </div>
                                    <div style={{fontSize:'15px', color:'white', position:'relative', width:'100%', height:'100%', background:'transparent', alignItems:'center', display:'flex', flexDirection:'column'}}>
                                    <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%', display:'flex', flexDirection:'column', alignItems:'center', fontWeight:'bold', justifyContent:'center', width:'100%'}}>
                                        <div>{item.positionPercent}%</div>
                                        <div>Correct</div>
                                        {item.positionPercent == 100.0 ? <div className="perfect">Perfect</div> : 
                                        (item.positionPercent < 100.0 && item.positionPercent >= 70.0 ? <div className="excellent">Excellent</div>:    
                                        (item.positionPercent < 70.0 && item.positionPercent >= 50.0 ? <div className="average">Average</div> : 
                                        (item.positionPercent < 50.0 ? <div className="poor">Poor</div> : null)))
                                        } 
                                    </div>
                                    <DoughnutChart data={moveChart[moveChart.findIndex(x=> x.userId == item.userId)].dataPosition}/>
    
                                    </div>
                                   
                                </div>
                              </Col>  
                            </Row>   
                            
                          </div>
                      </div>
                    </Col>
                    )
                }): 
                <Row gutter={[20, 20]} style={{width:'inherit', background:'transparent'}}>     
                    {session.map((item, index)=>(
                         <Col md={rows.length == 1 ? 24 : (rows.length == 2 ? 12 : 8)}>
                         <div key={index}>
                             <div style={{width:'inherit', height:'200px', backgroundColor:'#3A3C41', borderRadius:'10px', display:'flex', flexDirection:'column', alignItems:'center', boxShadow: '0px 0px 20px 1px #202225',}}>
                                 <div>Loading</div>
                             </div>
                         </div>
                     </Col>
                    ))}           
                </Row>
                }

                {/* Group */}
                <div style={{fontSize:'25px', color:'white', marginBottom:'10px', marginLeft:'10px'}}>Group Analytics</div>

                <Col md={24}>

                    <div style={{width:'100%', height:'100%', backgroundColor:'#3A3C41', borderRadius:'10px', display:'flex', flexDirection:'row', alignItems:'center', boxShadow: '0px 0px 20px 1px #202225', justifyContent:'space-evenly', padding:'10px'}}>                                    

                        <div style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                            <div style={{color:'#9BA6B2', fontSize:'20px'}}> 
                                    Move Analytics
                            </div>
                            {groupDanceScore.length ? 
                            <div style={{fontSize:'15px', color:'white', position:'relative', width:'100%', height:'100%', background:'transparent', alignItems:'center', display:'flex', flexDirection:'column'}}>
                                    <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%', display:'flex', flexDirection:'column', alignItems:'center', fontWeight:'bold', justifyContent:'center', width:'100%'}}>
                                        <div>{groupDanceScore[0].value}%</div>
                                        <div>Correct</div>
                                        {groupDanceScore[0].value == 100.0 ? <div className="perfect">Perfect</div> : 
                                        (groupDanceScore[0].value < 100.0 && groupDanceScore[0].value >= 70.0 ? <div className="excellent">Excellent</div>:    
                                        (groupDanceScore[0].value < 70.0 && groupDanceScore[0].value >= 50.0 ? <div className="average">Average</div> : 
                                        (groupDanceScore[0].value < 50.0 ? <div className="poor">Poor</div> : null)))
                                        } 
                                    </div>
                                    <DoughnutChart data={groupDanceScore}/>
                            </div>
                            : <div>?</div>}
                        </div>
                        <div style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                            <div style={{color:'#9BA6B2', fontSize:'20px'}}> 
                                    Position Analytics
                            </div>
                            {groupPositionScore.length ? 
                            <div style={{fontSize:'15px', color:'white', position:'relative', width:'100%', height:'100%', background:'transparent', alignItems:'center', display:'flex', flexDirection:'column'}}>
                                    <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%', display:'flex', flexDirection:'column', alignItems:'center', fontWeight:'bold', justifyContent:'center', width:'100%'}}>
                                        <div>{groupPositionScore[0].value}%</div>
                                        <div>Correct</div>
                                        {groupPositionScore[0].value == 100.0 ? <div className="perfect">Perfect</div> : 
                                        (groupPositionScore[0].value < 100.0 && groupPositionScore[0].value >= 70.0 ? <div className="excellent">Excellent</div>:    
                                        (groupPositionScore[0].value < 70.0 && groupPositionScore[0].value >= 50.0 ? <div className="average">Average</div> : 
                                        (groupPositionScore[0].value < 50.0 ? <div className="poor">Poor</div> : null)))
                                        } 
                                    </div>
                                    <DoughnutChart data={groupPositionScore}/>
    
                            </div>
                            :
                            <div>?</div>}
                        </div>
                    </div>
                </Col>


                {/* emg */}
                <Col md={24}>
                    <div style={{width:'100%', height:'100%', backgroundColor:'#3A3C41', borderRadius:'10px', display:'flex', flexDirection:'row', alignItems:'center', boxShadow: '0px 0px 20px 1px #202225', justifyContent:'space-evenly', padding:'10px'}}>
                        <div style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                            <div style={{color:'#9BA6B2', fontSize:'20px', marginBottom:'30px'}}> 
                                Fatigue Level
                            </div>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', width:'100%', marginTop:'10px'}}>
                                <div style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                                    <FatigueGraph emgData={emg}/>
                                </div>
                                {tired != null ?
                                <div style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                                You Got Tired At Around ...
                                <div style={{height:'100%', width:'100%', background:'transparent', fontWeight:'bold', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'50px'}}>{tired}</div>
                                <div style={{marginTop:'10px', fontSize:'30px', color:'white'}}>{tiredDuration} minutes</div>
                                <div>from the start</div>
                                </div>
                                : 
                                <div style={{fontSize:'30px', color:'white', height:'100%', width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                Fatigue Level did not reach Critical Level
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </Col>

                <Col md={24}>
                    <div style={{width:'100%', height:'100%', backgroundColor:'#3A3C41', borderRadius:'10px', display:'flex', flexDirection:'column', alignItems:'center', boxShadow: '0px 0px 20px 1px #202225', justifyContent:'space-evenly', padding:'10px'}}>
                        <div style={{color:'#9BA6B2', fontSize:'20px'}}> 
                            Sync Delay
                        </div>
                        <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'space-evenly'}}>
                        <div style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                            <SyncGraph syncData={syncDelay}/>
                        </div>
                        <div style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                            
                            <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-around', width:'inherit', background:'transparent', width:'100%'}}>
                            
                            
                                
                            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                Average Sync Delay Off By
                                <div style={{display:'flex', flexDirection:'column',height:'100%', background:'transparent', position:'relative', color:'white'}}>
                                <IoIosSync className="syncMoveBig"/>
                                <div style={{position:'absolute', top: '50%', left:'50%', transform:'translate(-50%, -50%)',fontSize:'32px', fontWeight:'bold'}}>
                                    {syncDelayDisplay ? `${syncDelayDisplay}s` : '?'}
                                    </div>
                                </div>
                            </div>
                            <div style={{marginTop:'20px'}}>
                                {syncDelayDisplay ?  (syncDelayDisplay == 0 ? 
                                <div className="perfectSync">Perfect Sync</div> : (
                                    syncDelayDisplay > 0 && syncDelayDisplay <= 0.5 ? 
                                    <div className="okSync">Almost Perfect Sync</div> : (syncDelayDisplay > 0.5 ? <div className="notSync">Please Match Up!</div> : null)
                                    
                                )) : <div style={{fontSize:'30px'}}>Get Ready...</div>}
                            </div>
                            </div>
                        </div>
                        </div>
                         
                    </div>
                    
                </Col>
            </Row>

        </div>
     );
}
 
export default Analytics

