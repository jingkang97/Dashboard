import React, {useState, useEffect} from 'react';
import { Table, Avatar, Tag, Input, Spin, Row, Col} from 'antd'
import {UserOutlined, SyncOutlined} from '@ant-design/icons';
import { AiOutlineWarning, AiOutlineLike, AiOutlineUser } from 'react-icons/ai';
import {IoIosSync} from 'react-icons/io'
import * as api from '../api/index'
import './styles.css'
import axios from 'axios'

const Analytics = ({stop, rows, session, emg, syncDelay, start, end}) => {
    const [evaluation, setEvaluation] = useState(null)
    const [danceScore, setDanceScore] = useState(0)
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
        for(let i = 0; i < session.length; i += 1){
            userDance.push({username: session[i].username, userId: session[i].userId, percent: '0%'})
        }
        let score = 0
        let total = 0
        for(let j = 0; j < session.length; j += 1){
            score = 0
            total = 0
            if(evaluation != null){
                for(let i = 0; i < evaluation.datas.length; i++){
                    // console.log('no?')
                    if(i < session[j].session.length){
                        // console.log('hihi')
                        // console.log('fromsession',session[j].userId)
                        // console.log('fromuserdance',userDance[j].userId)
                        total += 1
                        if(session[j].session[i].danceMove == evaluation.datas[i].danceMove){
                            // console.log('yes')
                            score += 1
                            userDance[j].percent = `${((score/total)*100).toFixed(1)}%`
                        }
                        else{
                            // console.log('no')
                        }
                    }
                }
            }
        }
        setDanceScore(userDance)
        // setDanceScore(score)
    }

    const calculateIndividualPosition = () => {

    }

    useEffect(()=>{
        if(evaluation != null){
            calculateIndividualDance()
        }
    },[evaluation])

    useEffect(() => {
       getEvaluation() 
    }, [stop])

    return ( 
        <div style={{width:'100%', background:'transparent'}}>
            {/* {danceScore} */}
            {/* {danceScore ? danceScore[0].username : null}
            {danceScore ? danceScore[0].percent : null}
            {danceScore ? danceScore[1].username : null}
            {danceScore ? danceScore[1].percent : null} */}
            {/* {evaluation.datas.length} */}
            <div style={{fontSize:'30px', color:'white', marginBottom:'10px'}}>Analytics</div>
            {/* individual  */}
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
                                    <div style={{fontSize:'30px', color:'white'}}>
                                    {item.percent}
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
                                    <div style={{fontSize:'30px', color:'white'}}>
                                    89% Correct

                                    </div>
                                </div>
                              </Col>  
                            </Row>   
                            
                          </div>
                      </div>
                    </Col>
                    )
                }): '?'}

                {/* Group */}
                <Col md={24}>
                    <div style={{width:'100%', height:'100px', backgroundColor:'#3A3C41', borderRadius:'10px', display:'flex', flexDirection:'row', alignItems:'center', boxShadow: '0px 0px 20px 1px #202225', justifyContent:'space-evenly', padding:'10px'}}>                                    
                        <div style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                            Moves Analytics
                            <div>...</div>
                        </div>
                        <div style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                            Position Analytics
                            <div>...</div>
                        </div>

                        
                    </div>
                   
                </Col>


                {/* emg */}
                <Col md={24}>
                    <div style={{width:'100%', height:'100px', backgroundColor:'#3A3C41', borderRadius:'10px', display:'flex', flexDirection:'row', alignItems:'center', boxShadow: '0px 0px 20px 1px #202225', justifyContent:'space-evenly'}}>
                    <div style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                        Fatigue Level
                        <div>...</div>
                    
                    </div>
                    <div style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                        Average Sync Delay
                        <div>...</div>
                    </div>
                         
                    </div>
                    
                </Col>
            </Row>
        </div>
     );
}
 
export default Analytics

