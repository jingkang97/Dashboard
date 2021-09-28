import React from "react";
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

const SyncGraph = () => {
    return ( 
        <div style={styles}>
            <AreaChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
            
            <Tooltip />
            <Area type={type} dataKey="value" fill="#5A65EA" stroke="#5A65EA"/>
            {/* <Line type={type} dataKey="value" stroke="url(#gradient)" dot={false} /> */}
            <XAxis dataKey="year" />
            <YAxis />
            </AreaChart>
        </div>
     );
}
 
export default SyncGraph;
