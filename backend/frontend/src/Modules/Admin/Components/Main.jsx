import { Route, Routes } from "react-router-dom";
import OverviewDashboard from "./OverviewDashboard";
import StaffsDashboard from "./StaffsDashboard";
import Preference from "./PreferenceSettings";
import EditProfileForm from "./ProfileSettings";
import Login from './Login';

const data = {
  firstName: "yona",
  lastName: "add",
  email: "asda@sdasd",
  password: "**********"
}

function Main() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<OverviewDashboard />}></Route>
            <Route path='/officers' element={<StaffsDashboard />}></Route>
        </Routes>
    </div>
  );
}
export default Main;