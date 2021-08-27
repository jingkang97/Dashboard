import React from 'react';
import { Card, Skeleton, Row, Col, } from 'antd';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, Legend } from 'recharts';
import { DashboardOutlined, UserOutlined, LikeOutlined } from '@ant-design/icons';
import { CollectionPlay, PlayBtn } from 'react-bootstrap-icons';

import './styles.css'
import * as dummy from './dummydata'


const Overview = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color:'#5a65ea' }} spin />;
    const [loading, setLoading] = React.useState(true)
    return ( 
        <div className="content">
        <Row gutter={21} style={{ marginBottom: 8 }}>
      <Col className="gutter-row" xs={21} lg={8} style={{ marginBottom: 15 }}>
      <Card  bordered={false} style={{ width: '100%', backgroundColor: '#3A3C41', borderRadius:'20px', color:'white',boxShadow:'0px 0px 20px 1px #202225'}}>
                <div style={{fontWeight:'bold', fontSize:'20px', color:'#9BA6B2', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>Total Sessions <CollectionPlay /></div>
                <Skeleton active />
        </Card>
      </Col>
      <Col className="gutter-row" xs={21} lg={8} style={{ marginBottom: 15 }}>
            <Card  bordered={false} style={{ width: '100%', backgroundColor: '#3A3C41', borderRadius:'20px', color:'white',boxShadow:'0px 0px 20px 1px #202225' }}>
            <div style={{fontWeight:'bold', fontSize:'20px', color:'#9BA6B2', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>Number of Users <UserOutlined /></div>
                <Skeleton 
                // loading={loading}
                loading={false}
                active
                >
                    <div style={{fontSize:'50px', height:'150px'}}>
                        16
                    </div>
                </Skeleton>
            </Card>
      </Col>
      
      <Col className="gutter-row" xs={21} lg={8} style={{ marginBottom: 15 }}>
      <Card  bordered={false} style={{ width: '100%', backgroundColor: '#5a65ea', borderRadius:'20px', color:'white',boxShadow:'0px 0px 20px 1px #5a65ea' }}>
      <div style={{fontWeight:'bold', fontSize:'20px', color:'#9BA6B2', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>Favourite Move <LikeOutlined /></div>
                <Skeleton active />
            </Card>
      </Col>
    </Row>
    <Row >
        <Card  bordered={false} style={{ width: '100%', backgroundColor: '#3A3C41', borderRadius:'20px', color:'white',boxShadow:'0px 0px 20px 1px #202225', position:'relative', overflow:'scroll'}}>
                <div style={{fontWeight:'bold', fontSize:'20px', color:'#9BA6B2', marginBottom:'20px'}}>Your Performance
                    <Spin indicator={antIcon} style={{position:'absolute', right:'0', top:'0', marginRight:'25px', marginTop:'30px'}}/>
                </div>
                <div style={{display:'flex', flexDirection:'row'}}>
                    
                
                    <div style={{width:'400px', height:'200px'}}>
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                        data={dummy.data}
                        margin={{
                            top: 10,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                        >		
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#5A65EA" stopOpacity={0.5}/>
                                <stop offset="95%" stopColor="#5A65EA" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        {/* <CartesianGrid strokeDasharray="3" /> */}
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend layout="horizontal" verticalAlign="top" align="right" />
                        <Line type="monotone" dataKey="pv" stroke="#E46389" dot={false} strokeWidth={3}/>
                        <Area type="monotone" dataKey="uv" stroke="#5A65EA" 
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
 
export default Overview;