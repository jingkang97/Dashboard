import React, {useState, useEffect} from 'react';
import { Table, Avatar, Tag, Input, Spin, Row, Col} from 'antd'
import {UserOutlined, SyncOutlined} from '@ant-design/icons';
import { AiOutlineWarning, AiOutlineLike, AiOutlineUser } from 'react-icons/ai';
import {IoIosSync} from 'react-icons/io'
import {io} from 'socket.io-client'
import * as api from '../api/index'
import './styles.css'
import axios from 'axios'

const Analytics = ({stop, rows, session, emg, syncDelay, start, end}) => {
    const [evaluation, setEvaluation] = useState([])
    const getEvaluation = async() => {
        try {
            await api.getEval().then(data => {
            alert('hi')
              console.log(data.data)
              setEvaluation(data)
              alert(data)
            })

          } catch (error) {
            alert(error)
          }
    }
    useEffect(() => {
       getEvaluation() 
    }, [stop])

    return ( 
        <div style={{width:'100%', background:'transparent'}}>
            <div style={{fontSize:'30px', color:'white', marginBottom:'10px'}}>Analytics</div>
            {/* individual  */}
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
                                    Move Analytics
                                    </div>
                                    <div style={{fontSize:'30px', color:'white'}}>
                                    89% Correct
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
                })}

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

