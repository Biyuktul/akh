import '../styles/Report.css';
import { Divider } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Year 2012',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Year 2013',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Year 2014',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Year 2015',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Year 2016',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Year 2017',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Year 2018',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const getIntroOfPage = (label) => {
  if (label === 'Year 2012') {
    return "Year 2012 is about men officers";
  }
  if (label === 'Year 2013') {
    return "Year 2013 is about women officers";
  }
  if (label === 'Year 2014') {
    return "Year 2014 is about women officers";
  }
  if (label === 'Year 2015') {
    return 'Year 2015 is about officers';
  }
  if (label === 'Year 2016') {
    return 'Year 2016 is about officers';
  }
  if (label === 'Year 2017') {
    return 'Year 2017 is about officers';
  }
  return '';
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc">description about registred officers.</p>
      </div>
    );
  }

  return null;
};

function Chart() {

    return (
        <div style={{width: '500px'}}>
        <Divider>Graph</Divider>
        <div className="chart-container">
            <BarChart
                width={450}
                height={290}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="pv" barSize={40} fill="#1d1d2c" />
            </BarChart>
        </div>
            </div>
    );
  }

  export default Chart;