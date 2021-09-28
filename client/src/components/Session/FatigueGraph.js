import React, {useState, useEffect} from "react";
import { LineChart, Line, XAxis, YAxis, ReferenceLine, AreaChart, Area, Tooltip} from "recharts";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

// change type to see that the overlap might not be appropriate towards the
// end of the shorter chart
const type = "monotone";

// calculate percentage for launchDate - index = 4, total = 7
// const percentage = 90.1;



const FatigueGraph = ({emgData}) => {
    const [percentage, setPercentage] = useState(100)
    const [tired, setTired] = useState(0)
    const [tiredTime, setTiredTime] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [tiredTimeDuration, setTiredTimeDuration] = useState(null)

    const calculatePercentage = (startTime, tiredTime) => {
        
    }

    const findTiredTime = () => {
        for(let i = 0; i < emgData.length; i++){
            if( emgData[i].emg > 3){
                setTiredTime(emgData[i].time)
                setTiredTimeDuration(emgData[i].time - startTime)
                calculatePercentage(startTime, emgData[i].time)
                break;
            }
        }
    }

    useEffect(() => {
        if(emgData.length > 0){
            setStartTime(emgData[0].time)
        }
    }, [emgData])

    useEffect(() => {
        if(startTime != null){
            findTiredTime()
        }
       
    }, [startTime])

    return ( 
        <div style={styles}>
            {console.log(emgData)}
            <AreaChart
            width={500}
            height={300}
            data={emgData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
            <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5A65EA" />
                <stop offset={`${percentage}%`} stopColor="#5A65EA"  />
                <stop offset={`${percentage}%`} stopColor="#ff6d98" />
                {/* <stop offset="100%" stopColor="#ff6d98" /> */}
            </linearGradient>
                
            </defs>
            <Tooltip />
            <Area type={type} dataKey="emg" fill="url(#gradient)" stroke="url(#gradient)" strokeWidth={3}/>
            <XAxis dataKey="time" />
            <YAxis dataKey="emg"/>
            <ReferenceLine x={tiredTime} label={<div style={{color:'white'}}>{tiredTime}</div>} />
            {/* <ReferenceLine x={tiredTime}  */}
            <ReferenceLine y={4} label={<div style={{color:'white'}}>Fatigue</div>} />
            </AreaChart>
        </div>
     );
}
 
export default FatigueGraph;
