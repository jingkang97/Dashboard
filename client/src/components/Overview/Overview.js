import React, {useEffect, useState} from 'react';
import { Card, Skeleton, Row, Col, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, Legend, AreaChart } from 'recharts';
import { UserOutlined, LikeOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { AppIndicator, CollectionPlay } from 'react-bootstrap-icons';
import {io} from 'socket.io-client'
import moment from 'moment'
import Authorisation from '../Authorisation/Authorisation'
import * as api from '../api/index'

import './styles.css'
import * as dummy from './dummydata'

const formatTooltip = value => (`${value} %`);


const Overview = ({user}) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color:'#5a65ea' }} spin />;
    const [loading, setLoading] = useState(false)
    const [userLoading, setUserLoading] = useState(false)
    const [userData, setUserData] = useState(null)
    const [totalSessions, setTotalSessions] = useState(0)
    const [averageDuration, setAverageDuration] = useState(0)
    const [totalDuration, setTotalDuration] = useState(0)
    const [number, setNumber] = useState(0)
    const [favourite, setFavourite] = useState('No favourite move')
    const [isTired, setIsTired] = useState(false)
    const [grade, setGrade] = useState('Average')
    const [percentageList, setPercentageList] = useState([{date: 0, accuracy: 0}, {date: 0, accuracy: 0}])
    const [percentageProgression, setPercentageProgression] = useState(0)

    const getUsers = () => {
        setUserLoading(true)
        api.getUsers().then(data => {
            console.log(data.data.length)
            // alert(data)
            setNumber(data.data.length)
            setUserLoading(false)
        })
    }

    const getUserData = () => {
        setLoading(true)
        const username = JSON.parse(localStorage.getItem('profile'))?.username
        if(username != null){
            api.getUser(username).then(data => {
                setUserData(data.data.data)
                setLoading(false)
            })
        }
    }    

    const calculateAverageDuration = () => {
        var arr = []
        var addition = 0
        for(var i = 0; i < userData.sessions.length; i++){
            const seconds = moment(userData.sessions[i].duration, 'mm:ss').format('s')
            // arr.push(userData.sessions[i].duration)
            arr.push(parseInt(seconds))
            addition += parseInt(seconds)
        }
        // alert(addition)
        var average = addition / userData.sessions.length
        var averageMinutes = Math.floor(average/60)
        var averageSeconds = (average - averageMinutes * 60)
        var averageTime = ''
        if(averageMinutes > 0){
            averageTime = `${averageMinutes} ${averageMinutes > 1 ? 'minutes' : 'minute'} ${averageSeconds.toFixed(2)} ${averageSeconds > 1 ? 'seconds' : 'second'}`
        }else{
            averageTime = `${average.toFixed(2) } ${averageSeconds> 1 ? 'seconds': 'second'}`
        }

        var minutes = Math.floor(addition/60)
        var seconds = addition - minutes * 60
        var totalTime = ''
        if(minutes > 0){
            totalTime = `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ${seconds} ${seconds > 1 ? 'seconds' : 'second'}`
        }else{
            totalTime = `${addition} ${seconds > 1 ? 'seconds': 'second'}`
        }

        setAverageDuration(averageTime)
        setTotalDuration(totalTime)
        // alert(arr)
    }

    const calculateFavourite = () => {
        var danceMoves = []
        var result = {}
        const username = JSON.parse(localStorage.getItem('profile'))?.username
        if(userData.sessions.length > 0){
            for(var i = 0; i < userData.sessions.length; i++){
                // alert('hi')
                for(var j = 0; j < userData.sessions[i].users.length; j++){
                    if(userData.sessions[i].users[j].username == username){
                        // alert('yes')
                        for(var k = 0; k < userData.sessions[i].users[j].session.length; k++){
                            danceMoves.push(userData.sessions[i].users[j].session[k].danceMove)
                        }
                    }
                }
            }
        }
        for(var i = 0; i < danceMoves.length; i++){
            if(!result[danceMoves[i]]){
                result[danceMoves[i]] = 1;
            }else{
                result[danceMoves[i]] += 1;
            }
        }
        var maximum = 0;
        var maximum_field = ''
        for(const key in result){
            if(result[key] > maximum){
                maximum = result[key]
                maximum_field = key
            }
        }
        setFavourite(maximum_field)
    }

    const calculateAveragePercentage = () => {
        var totalPercentage = 0
        var totalCount = 0
        var percentageArray = []
        const username = JSON.parse(localStorage.getItem('profile'))?.username
        if(userData.sessions.length > 0){
            for(var i = 0; i < userData.sessions.length; i ++){
                for(var j = 0; j < userData.sessions[i].individualMoveScore.length; j++){
                    if(userData.sessions[i].individualMoveScore[j].username == username){
                        percentageArray.push({date: moment(userData.sessions[i].endTime, 'DD MM YYYY h:mm:ss A').format('DD/MM/YYYY'), accuracy: userData.sessions[i].individualMoveScore[j].dataMove[0].value})
                        totalPercentage += userData.sessions[i].individualMoveScore[j].dataMove[0].value
                        totalCount += 1
                    }
                }
            }
        }
        // alert(totalPercentage)
        // alert(totalCount)
        var average = totalPercentage/totalCount
        if(average >= 75 && average < 100){
            setGrade('Excellent')
        }else if(average == 100){
            setGrade('Perfect')
        }else if(average < 75 && average >= 50){
            setGrade('Average')
        }else if(average < 50){
            setGrade('Poor')
        }
        console.log(percentageArray)
        setPercentageList(percentageArray)

        var progression = 0
        if(percentageArray.length > 0){
            progression = percentageArray[percentageArray.length-1].accuracy - percentageArray[0].accuracy
        }
        setPercentageProgression(progression.toFixed(2))

    }

    const calculateTiredness = () => {
        var tired = {'true': 0, 'false': 0}
        const username = JSON.parse(localStorage.getItem('profile'))?.username
        if(userData.sessions.length > 0){
            for(var i = 0; i < userData.sessions.length; i++){
                // alert('hi')
                tired[`${userData.sessions[i].tired}`] += 1
            }
        }
        // alert(tired['true'])
        if(tired['true'] > tired['false']){
            setIsTired(true)
        }else{
            setIsTired(false)
        }
    }

    useEffect(() => {
        if(userData != null){
            // alert('set!')
            console.log(userData)
            setTotalSessions(userData.sessions.length)
            calculateAverageDuration()
            calculateFavourite()
            calculateTiredness()
            calculateAveragePercentage()
        }
    }, [userData])

    useEffect(() => {
        getUsers()
        getUserData() 
    }, [])

    return ( 
        <div className="content">
            {/* {array.length} */}
            <Row gutter={21} style={{ marginBottom: 0, marginTop:'-25px'}}>
                <div style={{fontSize:'15px', margin:'0px 0px 10px 15px'}}>
                    {/* Good Afternoon,<span className="name"> {user}!</span> */}
                    Good Afternoon,<span className="name"> {JSON.parse(localStorage.getItem('profile'))?.username}!</span>
                </div>
                <div className="description" style={{fontSize:'12px', backgroundColor:'pink', margin:'0px 10px 15px 10px'}}>
                <Skeleton 
                loading={loading}
                active
                >
                <div style={{fontSize:'15px', fontWeight:'bold'}}>
                    {grade == 'Excellent' || grade == 'Perfect' ? 'Keep up the good work!' : 'Practice makes perfect!'}
                </div>
                You danced an average of <span style={{fontWeight:'bold'}}>{averageDuration}</span> every session and you have achieved an average grade of 
                 <span style={{fontWeight:'bold'}}> {`'${grade}'`}</span>! 
                 {isTired ? ' You tend to dance till your muscle is fatigued so do remember to stretch and take adequate rest!': ' You do not dance till your muscle is fatigue so keep that up!'}
                </Skeleton>
                </div>
                
            </Row>
        <Row gutter={21} style={{ marginBottom: 0 }}>
      <Col className="gutter-row" xs={21} lg={8} style={{ marginBottom: 15 }}>
      <Card  bordered={false} style={{width: '100%', backgroundColor: '#3A3C41', borderRadius:'20px', color:'white',boxShadow:'0px 0px 20px 1px #202225' }}>
                <div style={{fontWeight:'bold', fontSize:'15px', color:'#9BA6B2', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>Total Sessions <CollectionPlay /></div>
                <Skeleton 
                // loading={loading}
                loading={loading}
                active
                >
                <div style={{height:'130px'}}>
                <div style={{fontSize:'50px', height:'100px'}}>
                    
                    {totalSessions}
                        {/* {test} */}
                    </div>
                {/* <Skeleton size="large" active /> */}
                </div>
                </Skeleton>
        </Card>
      </Col>
      <Col className="gutter-row" xs={21} lg={8} style={{ marginBottom: 10 }}>
            <Card  bordered={false} style={{width: '100%', backgroundColor: '#3A3C41', borderRadius:'20px', color:'white',boxShadow:'0px 0px 20px 1px #202225' }}>
            <div style={{fontWeight:'bold', fontSize:'15px', color:'#9BA6B2', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>Number of Users <UserOutlined /></div>
                <Skeleton 
                loading={userLoading}
                active
                >
                    <div style={{height:'130px'}}>
                    <div style={{fontSize:'50px', height:'100px'}}>
                    {number}

                    </div>
                    </div>
                    {/* <div style={{fontSize:'50px', height:'100px'}}>
                        16
                    </div> */}
                   
                </Skeleton>
                
            </Card>
      </Col>
      
      <Col className="gutter-row" xs={21} lg={8} style={{ marginBottom: 12 }}>
      <Card  bordered={false}  style={{ width: '100%', backgroundColor: '#5a65ea', borderRadius:'20px', color:'white',boxShadow:'0px 0px 20px 1px #5a65ea' }}>
      <div style={{fontWeight:'bold', fontSize:'15px', color:'#9BA6B2', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>Favourite Move <LikeOutlined /></div>
                <Skeleton 
                loading={loading}
                active
                >
                    <div style={{height:'130px'}}>
                    <div style={{fontSize:'50px', height:'100px'}}>
                    {favourite}

                    </div>
                    </div>
                    {/* <div style={{fontSize:'50px', height:'100px'}}>
                        16
                    </div> */}
                   
                </Skeleton>
                
            </Card>
      </Col>
    </Row>
    <Row >
        <Card  bordered={false} style={{ width: '100%', backgroundColor: '#3A3C41', borderRadius:'20px', color:'white',boxShadow:'0px 0px 20px 1px #202225', position:'relative', overflow:'scroll'}}>
                {/* <div style={{fontWeight:'bold', fontSize:'15px', color:'#9BA6B2', marginBottom:'20px'}}>Your Performance
                    <Spin indicator={antIcon} style={{position:'absolute', right:'0', top:'0', marginRight:'25px', marginTop:'30px'}}/>
                </div> */}
                <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
                    <div style={{width:'100%', height:'200px'}}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                        // data={dummy.data}
                        data={percentageList}
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
                        <XAxis 
                        // dataKey="createdAt" 
                        dataKey="date"
                        // interval={0}
                        />

                        <YAxis type="number" 
                        tickFormatter={(tickValue) => `${tickValue}%`}

                        // domain={['auto', 'dataMax + 20']}
                        // domain={['dataMin - 50', 'dataMax + 50']}
                        />
                        <Tooltip formatter={formatTooltip}/>
                        <Legend layout="horizontal" verticalAlign="top" align="right" />
                        {/* <Line type="monotone" dataKey="ay" stroke="#E46389" dot={false} strokeWidth={3}/> */}
                        <Area type="monotone" dataKey="accuracy" stroke="#5A65EA" 
                        isAnimationActive={true}
                        fill="url(#colorUv)" 
                        strokeWidth={3}
                        />
                        </AreaChart>
                    </ResponsiveContainer>
                    </div>
                    <div style={{fontSize:'15px', background:'transparent', width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>   
                        <div style={{fontWeight:'bold', color:'#9BA6B2', marginLeft:'20px'}}>
                            Move Accuracy Progression
                        </div>
                        
                        <div style={{display:'flex', width:'100%', flexDirection:'row', height:'100%', alignItems:'center', justifyContent:'center', padding:'30px'}}>
                        <Skeleton
                        loading={loading}
                        active
                        >
                            {percentageProgression > 0 ? <div style={{fontSize:'50px', color:'lightgreen', fontWeight:'bold'}}>{percentageProgression}% <CaretUpOutlined /> </div> : (percentageProgression == 0 ? <div style={{fontSize:'50px', color:'white', fontWeight:'bold'}}>{percentageProgression}%</div>: <div style={{fontSize:'50px', color:'rgb(255, 109, 152)', fontWeight:'bold'}}>{percentageProgression}% <CaretDownOutlined /></div>)}
                            </Skeleton>
                        </div>
                        
                    </div>
                </div>
        </Card>

    </Row>
            
        </div>
     );
}
 
export default Authorisation(Overview);