
import Chart from './Chart';
import ActivityLog from './ActivityLog';
import { GiPoliceOfficerHead } from 'react-icons/gi';
import { MdLocalPolice } from 'react-icons/md';
import { FaFlag } from 'react-icons/fa';
import '../styles/Main.css';
import SquareCard from './SquareCard';

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


function OverviewDashboard() {
  return (
    <div className="admin-overview-container">
        <div className='admin-card-container'>
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

        <div className='admin-chart-container2'>
            <Chart />
        </div>
        <div className= 'mt-0 mr-10'>
            <ActivityLog />
        </div>
    </div>
  );
}
export default OverviewDashboard;