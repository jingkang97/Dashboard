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
        if(maximum > 1){
            setPercent((maximum - 1 * 100))
        }
    }

    return ( 
        <div style={styles}>
            {console.log(syncData)}
            <AreaChart
            width={500}
            height={300}
            data={syncData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
                <defs>
            <linearGradient id="gradients" x1="0" y1="0" x2="0" y2="1">
                {/* <stop offset="0%" stopColor="#5A65EA" /> */}
                <stop offset={`${percent}%`} stopColor="#ff6d98" />
                <stop offset={`${0}%`} stopColor="#5A65EA"  />

                {/* <stop offset="100%" stopColor="#ff6d98" /> */}
            </linearGradient>
                
            </defs>
            <Tooltip />
            <ReferenceLine y={1} label={<div style={{color:'white'}}>Exceed Threshold</div>} />
            {/* <Area type={type} dataKey="sync" fill="#5A65EA" stroke="#5A65EA"/> */}
            <Area type={type} dataKey="sync" fill="url(#gradients)" stroke="url(#gradients)"/>
            <XAxis dataKey="time" />
            <YAxis dataKey="sync"/>
            </AreaChart>
        </div>
     );
}
 
export default SyncGraph;
