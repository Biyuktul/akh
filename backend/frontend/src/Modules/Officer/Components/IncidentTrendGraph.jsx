import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', incidents: 10 },
  { name: 'Feb', incidents: 15 },
  { name: 'Mar', incidents: 10 },
  { name: 'Apr', incidents: 5 },
  { name: 'May', incidents: 20 },
  { name: 'Jun', incidents: 35 },
  { name: 'Jul', incidents: 10 },
  { name: 'Aug', incidents: 25 },
  { name: 'Sep', incidents: 30 },
  { name: 'Oct', incidents: 15 },
  { name: 'Nov', incidents: 40 },
  { name: 'Dec', incidents: 65 },
];

const TrendingIncidentsChart = () => (
  <LineChart width={400} height={300} data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <CartesianGrid stroke="#ccc" />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="incidents" stroke="#8884d8" activeDot={{ r: 8 }} />
  </LineChart>
);

export default TrendingIncidentsChart;
