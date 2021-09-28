import React, {useState, useEffect} from 'react';
import { Table, Avatar, Tag, Input, Spin, Row, Col} from 'antd'
import {UserOutlined, SyncOutlined} from '@ant-design/icons';
import { AiOutlineWarning, AiOutlineLike, AiOutlineUser } from 'react-icons/ai';
import {IoIosSync} from 'react-icons/io'
import * as api from '../api/index'
import './styles.css'

const Analytics = ({stop, rows, session, emg, syncDelay, start, end}) => {
    const [evaluation, setEvaluation] = useState(null)
    const [danceScore, setDanceScore] = useState(0)
    const [loading, setLoading] = useState(false)
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
            userDance.push({username: session[i].username, userId: session[i].userId, movePercent: '0%', positionPercent:'0%'})
        }
        let moveScore = 0
        let moveTotal = 0
        for(let j = 0; j < session.length; j += 1){
            moveScore = 0
            moveTotal = 0
            if(evaluation != null){
                for(let i = 0; i < evaluation.datas.length; i++){
                    if(i < session[j].session.length){
                        moveTotal += 1
                        if(session[j].session[i].danceMove == evaluation.datas[i].danceMove){
                            moveScore += 1
                            userDance[j].movePercent = `${((moveScore/moveTotal)*100).toFixed(1)}% Correct`
                        }
                        else{
                            // console.log('no')
                        }
                    }
                }
            }
        }

        let danceScore = 0
        let danceTotal = 0
        for(let j = 0; j < session.length; j += 1){
            danceScore = 0
            danceTotal = 0
            if(evaluation != null){
                for(let i = 0; i < evaluation.datas.length; i++){
                    if(i < session[j].session.length){
                        danceTotal += 1
                        // CHANGE CSV DATA FIRST
                        let temp = evaluation.datas[i].position.split(',')
                        console.log(temp)
                        // console.log(session[j].session[i].position)
                        console.log(temp.indexOf(session[j].session[i].position))
                        if(temp.indexOf(session[j].session[i].position) + 1 == session[j].session[i].position){
                            danceScore += 1
                            userDance[j].positionPercent = `${((danceScore/danceTotal)*100).toFixed(1)}% Correct`
                        }
                        else{
                            // console.log('no')
                        }
                    }
                }
            }
        }


        setDanceScore(userDance)
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
                                    {item.movePercent}
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
                                    {item.positionPercent}

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
                                 Loading...
                             </div>
                         </div>
                     </Col>
                    ))}           
                </Row>
                }

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

