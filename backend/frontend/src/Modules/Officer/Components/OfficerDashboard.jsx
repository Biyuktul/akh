import Sidebar from "../../Admin/Components/Sidebar";
import { Layout } from 'antd';
import {IoDocumentAttach} from 'react-icons/io5'
import { TbLogout} from 'react-icons/tb'
import {FcProcess} from 'react-icons/fc'
import {GiPoliceCar} from 'react-icons/gi'
import { PieChartOutlined } from '@ant-design/icons';
import {CgProfile} from 'react-icons/cg'
import {HiOutlineDocumentReport} from 'react-icons/hi'
import MyProfile from "./Profile";
import AppBarMU from "./AppBar";
import Main from "./Main";
import {BsFillPersonBadgeFill} from 'react-icons/bs'
import CampaignIcon from '@mui/icons-material/Campaign';
import CivilianPost from "./Post";

const { Content, Footer } = Layout;



const items = [
        {
          key: '1',
          icon: <PieChartOutlined />,
          label: 'Overview',
          link: '/'
        },
        {
          key: '2',
          icon: <IoDocumentAttach />,
          label: 'Case Managment',
          link: '/case_mgt'
        },
        {
          key: '3',
          icon: <FcProcess />,
          label: 'Criminal Records',
          link: '/criminal_records'
        },
        {
          key: '4',
          icon: <GiPoliceCar />,
          label: 'Incidents',
          link: '/incidents'
        },
        {
          key: '5',
          icon: <HiOutlineDocumentReport />,
          label: 'Reports',
          link: '/reports'
        },
        {
          key: '6',
          icon: <CampaignIcon />,
          label: 'Complains',
          link: '/complains'
        },
        {
          key: '7',
          icon: <BsFillPersonBadgeFill />,
          label: <CivilianPost />,
          link: '/civilian'
        },
        {
          key: '8',
          icon: <CgProfile />,
          label: <MyProfile />,
        },
        {
          key: '9',
          icon: <TbLogout />,
          label: 'Logout',
        },

      ];

const OfficerDashboard = () => {
        
  return (
    <Layout style={{ height: '100vh' }}>
      <Sidebar items={items}/>
      <Layout className="site-layout" style={{backgroundColor: '#D8D8FF',paddingLeft: '200px', height: '100%'}}>
        <AppBarMU />
        <Content style={{height: '100%', overflow: 'auto'}}>
          <div style={{ padding: 0, minHeight: 360 }}>
            {<Main />}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: '#002140',height: 40, color: "white"}}>
                PSRMS ©2023
        </Footer>
      </Layout>
    </Layout>
  );
};
export default OfficerDashboard;
