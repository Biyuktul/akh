import SquareCard from './SquareCard';
import { GiPoliceOfficerHead, GiHandcuffs } from 'react-icons/gi';
import { MdLocalPolice } from 'react-icons/md';
import { FaFlag } from 'react-icons/fa';
import '../styles/style.css';
import EditableTable from './ReportTable';
import { useState } from 'react';

const card1_info = "open cases"
const card2_info = "closed cases"
const card3_info = "complaints"
const card4_info = "warnings"
const card5_info = "arrests"
const card6_info = "incidents reported"
const chartData = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 120 },
    { name: 'Mar', value: 150 },
    { name: 'Apr', value: 130 },
    { name: 'May', value: 180 },
    { name: 'Jun', value: 200 },
  ];

  const sample = [
    {
        key: "1",
        name: "Yon Brown",
        date: '22/22/22',
        reportBody: 'the report body here'
      },
      {
        key: "2",
        name: "Yon Brown",
        date: '22/22/22',
        reportBody: 'the report body here'
      },
      {
        key: "3",
        name: "Yon Brown",
        date: '22/22/22',
        reportBody: 'the report body here'
      },
      {
        key: "4",
        name: "Yon Brown",
        date: '22/22/22',
        reportBody: 'the report body here'
      },
      {
        key: "5",
        name: "Yon Brown",
        date: '22/22/22',
        reportBody: 'the report body here'
      },
      {
        key: "5",
        name: "Yon Brown",
        date: '22/22/22',
        reportBody: 'the report body here'
      },
      {
        key: "6",
        name: "Yon Brown",
        date: '22/22/22',
        reportBody: 'the report body here'
      },
      {
        key: "7",
        name: "Yon Brown",
        date: '22/22/22',
        reportBody: 'the report body here'
      },
      {
        key: "8",
        name: "Yon Brown",
        date: '22/22/22',
        reportBody: 'the report body here'
      },
      {
        key: "9",
        name: "Yon Brown",
        date: '22/22/22',
        reportBody: 'the report body here'
      },
  ]

function OverviewDashboard() {
    const [data, setData] = useState(sample);
  return (
    <div className="overview-container">
        <div className='card-container'>
            <SquareCard title={card1_info} number={40} chartData={chartData} className="flex justify-center">
                <MdLocalPolice size={30} style={{ fill: '#0E8388' }}/>
            </SquareCard>
            <SquareCard title={card2_info} number={40} chartData={chartData} >
                <GiPoliceOfficerHead size={30} style={{ fill: '#4D455D' }}/>
            </SquareCard>
            <SquareCard title={card3_info} number={40} chartData={chartData} >
                <FaFlag size={30} style={{ fill: '#698269' }}/>
            </SquareCard>
            <SquareCard title={card6_info} number={40} chartData={chartData} >
                <GiPoliceOfficerHead size={30} style={{ fill: '#4D455D' }}/>
            </SquareCard>
            
        </div>
        <div className='w-full report-container2'>
            <EditableTable 
            data={data} 
            setData={setData}
            />          
        </div>
    </div>
  );
}
export default OverviewDashboard;