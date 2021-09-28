import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#5965EA', '#FF6D98'];

// const data = [
//   { name: 'A1', value: 100 },
//   { name: 'A2', value: 300 },
// ];
const formatTooltip = value => (`${value} %`);


const Chart = ({data}) => {
    // const [data, setData] = useState()
    return ( 
        <div style={{height:'250px', width:'300px'}}>
            {console.log(data)}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart 
        >
        <Tooltip formatter={formatTooltip}/>
          {/* <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" /> */}
          <Pie data={data} dataKey="value"  innerRadius={70} outerRadius={90} label>
          {data ? data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            )) : <div>?</div>}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      </div>
     );
}
 
export default Chart;

// export default class Example extends PureComponent {
//   static demoUrl = 'https://codesandbox.io/s/pie-chart-of-two-levels-gor24';

//   render() {
//     return (
        
//     );
//   }
// }
