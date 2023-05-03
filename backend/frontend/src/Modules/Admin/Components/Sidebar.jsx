import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import Logo from '../assets/images/police-logo.png';
import { Switch } from 'antd';

const { Sider } = Layout;

const Sidebar = ({items}) => {

    return (
          <Sider style={{position: 'fixed', height: '100vh'}}>
            <div className='w-full flex justify-center'>
              <img src={Logo} style={{ height: 75, margin: 16 }} alt="logo"/>
            </div>
            <Menu
              theme="dark"
              defaultSelectedKeys={['1']}
              mode="inline"
            >
              {items && items.map(item => (
                item.children ? (
                  <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                    {item.children.map(child => (
                      <Menu.Item key={child.key}>
                        <Link to={child.link}>{child.label}</Link>
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ) : (
                  <Menu.Item key={item.key} icon={item.icon}>
                    <Link to={item.link}>{item.label}</Link>
                  </Menu.Item>
                )
              ))}
            </Menu>
          </Sider>
        
      );
}

export default Sidebar;