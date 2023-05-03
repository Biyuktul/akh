import { Card } from 'antd';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const SquareCard = ({ title, number, chartData }) => {
  return (
    <Card className="square-card">
      <div className="square-card-header">
        <h3>{title}</h3>
        <p>{number}</p>
      </div>
      <div className="square-card-chart">
        <LineChart width={250} height={150} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>
    </Card>
  );
};

export default SquareCard;
