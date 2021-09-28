import React from "react";
import { LineChart, Line, XAxis, YAxis, ReferenceLine, AreaChart, Area, Tooltip} from "recharts";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

// change type to see that the overlap might not be appropriate towards the
// end of the shorter chart
const type = "monotone";

// calculate percentage for launchDate - index = 4, total = 7
const percentage = 100 - ((7 - 4 - 1) / (7 - 1)) * 100;



const FatigueGraph = ({emgData}) => {
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
                <stop offset="100%" stopColor="#ff6d98" />
            </linearGradient>
                
            </defs>
            <Tooltip />
            <Area type={type} dataKey="emg" fill="url(#gradient)" stroke="url(#gradient)" strokeWidth={3}/>
            <XAxis dataKey="time" />
            <YAxis dataKey="emg"/>
            <ReferenceLine x={launchDate} label={<div style={{color:'white'}}>Fatigue</div>} />
            </AreaChart>
        </div>
     );
}
 
export default FatigueGraph;
