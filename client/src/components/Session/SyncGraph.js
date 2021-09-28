import React, {useState, useEffect} from "react";
import { render } from "react-dom";

import { LineChart, Line, XAxis, YAxis, ReferenceLine, AreaChart, Area, Tooltip} from "recharts";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const data = [];
const launchDate = 2004;

const rand = 300;
for (let i = 0; i < 7; i++) {
  const year = 2000 + i;
  const value = Math.random() * (rand + 50) + 100;
  let d = {
    year: year,
    value: value
  };

  data.push(d);
}

// change type to see that the overlap might not be appropriate towards the
// end of the shorter chart
const type = "monotone";

// calculate percentage for launchDate - index = 4, total = 7
const percentage = 100 - ((7 - 4 - 1) / (7 - 1)) * 100;

const SyncGraph = ({syncData}) => {
    const [percent, setPercent] = useState(0)

    const calculatePercentage = () => {
        let maximum = 0
        for(let i = 0; i < syncData.length; i ++){
            maximum = Math.max(syncData[i].sync, maximum)
        }
        if(maximum > 0.75){
            setPercent((maximum - 0.75)/maximum * 100)

        }
    }


    useEffect(() => {
        if(syncData.length){
            calculatePercentage()
        }
        
    }, [syncData])
    return ( 
        <div style={styles}>
            {/* {alert(percent)} */}
            {console.log(syncData)}
            <AreaChart
            width={500}
            height={300}
            data={syncData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
            <defs>
            <linearGradient id="gradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset={`${100-percentage}%`} stopColor="#5A65EA"  />
                <stop offset={`${percentage}%`} stopColor="#ff6d98" />
            </linearGradient>
                
            </defs>
            <Tooltip />
            <ReferenceLine y={0.75} label={<div style={{color:'white'}}>Exceed Threshold</div>} />
            {/* <Area type={type} dataKey="sync" fill="#5A65EA" stroke="#5A65EA"/> */}
            <Area type={type} dataKey="sync" fill="url(#gradient)" stroke="url(#gradient)"/>
            <XAxis dataKey="time" />
            <YAxis dataKey="sync"/>
            </AreaChart>
        </div>
     );
}
 
export default SyncGraph;
