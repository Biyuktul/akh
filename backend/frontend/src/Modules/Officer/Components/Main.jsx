import { Route, Routes } from "react-router-dom";
import Incident from './Incident';
import CaseTable from "./CaseTable";
import ReportPage from './ReportPage';
import Criminal from "./Criminal";
import ComplainPage from "./ComplainPage";
const data = [
  { 
    id: 1,
    type: 'Body Related',
    date: '12/10/2008',
    priority: 'High', 
    status: 'in progress',
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 2, 
    type: 'Body Related', 
    date: '12/10/2008', 
    priority: 'High', 
    status: 'in progress', 
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 3, 
    type: 'Property Related', 
    date: '12/10/2008', 
    priority: 'High', 
    status: 'in progress', 
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 1,
    type: 'Body Related',
    date: '12/10/2008',
    priority: 'High', 
    status: 'in progress',
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 2, 
    type: 'Body Related', 
    date: '12/10/2008', 
    priority: 'High', 
    status: 'in progress', 
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 3, 
    type: 'Property Related', 
    date: '12/10/2008', 
    priority: 'High', 
    status: 'in progress', 
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 1,
    type: 'Body Related',
    date: '12/10/2008',
    priority: 'High', 
    status: 'in progress',
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 2, 
    type: 'Body Related', 
    date: '12/10/2008', 
    priority: 'High', 
    status: 'in progress', 
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 3, 
    type: 'Property Related', 
    date: '12/10/2008', 
    priority: 'High', 
    status: 'in progress', 
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 1,
    type: 'Body Related',
    date: '12/10/2008',
    priority: 'High', 
    status: 'in progress',
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 2, 
    type: 'Body Related', 
    date: '12/10/2008', 
    priority: 'High', 
    status: 'in progress', 
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 3, 
    type: 'Property Related', 
    date: '12/10/2008', 
    priority: 'High', 
    status: 'in progress', 
    team: '223344',
    description: 'some description about the case'
  },3213123
];
function Main() {
  return (
    <div>
        <Routes>
            <Route path='/case_mgt' element={<CaseTable data={data}/>}></Route>
            <Route path='/criminal_records' element={<Criminal />}></Route>
            <Route path='/incidents' element={<Incident/>}></Route>
            <Route path="/reports" element={<ReportPage />}> </Route>
            <Route path="/complains" element={<ComplainPage />} ></Route>
        </Routes>
    </div>
  );
}
export default Main;