import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
        { location: 'New York', count: 10 },
        { location: 'Los Angeles', count: 7 },
        { location: 'Chicago', count: 5 },
        { location: 'Houston', count: 3 },
        { location: 'Miami', count: 2 },
];

const TrendingLocations = () => {
  return (
    <div className="w-full h-full">
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="location" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default TrendingLocations;
