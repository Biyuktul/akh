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
            <Route path='/staffs' element={<StaffsDashboard />}></Route>
            <Route path='/preference-settings' element={<Preference />}></Route>
            <Route path='/profile-settings' element={<EditProfileForm initialValues={data}/>}></Route>
            <Route path="/logout" element={<Login />}> </Route>
        </Routes>
    </div>
  );
}
export default Main;