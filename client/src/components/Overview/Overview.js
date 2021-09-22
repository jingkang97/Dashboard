import React, {useEffect, useState} from 'react';
import { Card, Skeleton, Row, Col, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, Legend } from 'recharts';
import { UserOutlined, LikeOutlined } from '@ant-design/icons';
import { CollectionPlay } from 'react-bootstrap-icons';
import {io} from 'socket.io-client'
import moment from 'moment'
import Authorisation from '../Authorisation/Authorisation'

import './styles.css'
import * as dummy from './dummydata'

const Overview = ({user}) => {
    // const socket = io("http://localhost:5000")
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color:'#5a65ea' }} spin />;
    const [loading, setLoading] = useState(true)
    const [test, setTest] = useState(0)
    // const [array, setArray] = useState([])
    // let array = []
    // useEffect(() => {
    //     // socket.on("newUser", (user) => {
    //     //   console.log(user)
    //     // })
    //     const socket = io("http://localhost:5000")

    //     socket.on("newData", (data) => {
    //         // console.log(data.ax)
    //         // array.push(data.ax)
    //         // setTest(array)
    //     setArray(prevArray => [...prevArray, data])
    //       console.log(data)
            
    //     })
    //     // socket.close()
        
    //   }, [])

    //   useEffect(() => {
    //       console.log(array.length)
    //     //   if(array.length >= 5){
    //     //       setArray(array.slice(1))
    //     //   }
    //     // if(array.length >= 3){
    //     //     setArray(prevArray => [prevArray.slice(1)])
    //     // }
    //     //   console.log(array)
    //   }, [array])
    return ( 
        <div className="content">
            {/* {array.length} */}
            <Row gutter={21} style={{ marginBottom: 0, marginTop:'-25px'}}>
                <div style={{fontSize:'15px', margin:'0px 0px 10px 15px'}}>
                    {/* Good Afternoon,<span className="name"> {user}!</span> */}
                    Good Afternoon,<span className="name"> {JSON.parse(localStorage.getItem('profile'))?.username}!</span>
                </div>
                <div className="description" style={{fontSize:'12px', backgroundColor:'pink', margin:'0px 10px 15px 10px'}}>
                <div style={{fontSize:'15px', fontWeight:'bold'}}>Keep up the good work!</div>
                You danced an average of <span style={{fontWeight:'bold'}}>24</span> mins today and you have achieved an average grade of 
                 <span style={{fontWeight:'bold'}}> 'Excellent'</span>! 
                You tend to dance till your muscle is fatigued so do remember to stretch and take adequate rest!
                </div>
                
            </Row>
        <Row gutter={21} style={{ marginBottom: 0 }}>
      <Col className="gutter-row" xs={21} lg={8} style={{ marginBottom: 15 }}>
      <Card  bordered={false} style={{ width: '100%', backgroundColor: '#3A3C41', borderRadius:'20px', color:'white',boxShadow:'0px 0px 20px 1px #202225'}}>
                <div style={{fontWeight:'bold', fontSize:'15px', color:'#9BA6B2', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>Total Sessions <CollectionPlay /></div>
                <div style={{height:'130px'}}>
                <div style={{fontSize:'50px', height:'100px'}}>
                        {/* {test} */}
                    </div>
                {/* <Skeleton size="large" active /> */}
                </div>
        </Card>
      </Col>
      <Col className="gutter-row" xs={21} lg={8} style={{ marginBottom: 10 }}>
            <Card  bordered={false} style={{height:'200px', width: '100%', backgroundColor: '#3A3C41', borderRadius:'20px', color:'white',boxShadow:'0px 0px 20px 1px #202225' }}>
            <div style={{fontWeight:'bold', fontSize:'15px', color:'#9BA6B2', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>Number of Users <UserOutlined /></div>
                <Skeleton 
                // loading={loading}
                loading={false}
                active
                >
                    {/* <div style={{fontSize:'50px', height:'100px'}}>
                        16
                    </div> */}
                   
                </Skeleton>
                
            </Card>
      </Col>
      
      <Col className="gutter-row" xs={21} lg={8} style={{ marginBottom: 12 }}>
      <Card  bordered={false} style={{ height:'200px',width: '100%', backgroundColor: '#5a65ea', borderRadius:'20px', color:'white',boxShadow:'0px 0px 20px 1px #5a65ea' }}>
      <div style={{fontWeight:'bold', fontSize:'15px', color:'#9BA6B2', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>Favourite Move <LikeOutlined /></div>
                <div style={{height:'50px'}}>
                <Skeleton active />
                </div>
                
            </Card>
      </Col>
    </Row>
    <Row >
        <Card  bordered={false} style={{ width: '100%', backgroundColor: '#3A3C41', borderRadius:'20px', color:'white',boxShadow:'0px 0px 20px 1px #202225', position:'relative', overflow:'scroll'}}>
                <div style={{fontWeight:'bold', fontSize:'15px', color:'#9BA6B2', marginBottom:'20px'}}>Your Performance
                    <Spin indicator={antIcon} style={{position:'absolute', right:'0', top:'0', marginRight:'25px', marginTop:'30px'}}/>
                </div>
                <div style={{display:'flex', flexDirection:'row'}}>
                    <div style={{width:'400px', height:'200px'}}>
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                        data={dummy.data}
                        // data={array}
                        margin={{
                            top: 10,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                        >		
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#5A65EA" stopOpacity={0.9}/>
                                <stop offset="95%" stopColor="#5A65EA" stopOpacity={0.2}/>
                            </linearGradient>
                        </defs>
                        {/* <CartesianGrid strokeDasharray="3" /> */}
                        {/* <XAxis dataKey="name" /> */}
                        <XAxis 
                        // dataKey="createdAt" 
                        dataKey="createdAt"
                        tickFormatter={timeStr => moment(timeStr).format('ss')} 
                        />

                        <YAxis type="number" 
                        // domain={['auto', 'dataMax + 20']}
                        domain={['dataMin - 50', 'dataMax + 50']}

                        />
                        <Tooltip />
                        <Legend layout="horizontal" verticalAlign="top" align="right" />
                        <Line type="monotone" dataKey="ay" stroke="#E46389" dot={false} strokeWidth={3}/>
                        <Area type="monotone" dataKey="ax" stroke="#5A65EA" 
                        // animationDuration={500}
                        animationDuration={500}

                        fill="url(#colorUv)" 
                        strokeWidth={3}
                        />
                        </ComposedChart>
                    </ResponsiveContainer>
                    </div>
                    <div style={{fontSize:'15px'}}>   
                        <div style={{fontWeight:'bold', color:'#9BA6B2', marginLeft:'20px'}}>
                            Average Mistakes
                        </div>
                    </div>
                </div>
        </Card>

    </Row>
            
        </div>
     );
}
 
export default Authorisation(Overview);