import StaffTable from './StaffTable';

import '../styles/App.css';

const employees = [
        { id: 1, name: 'Alice', phone: '0900998899', role: 'Patrol', logon_name: 50000, password: '***********', address: 'Some Address', status: 'active', rank: 'level 4',photoUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 2, name: 'Bob', phone: '0900998899', role: 'Detective', logon_name: 75000, password: '***********', address: 'Some Address',rank: 'level 4', status: 'active',photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 3, name: 'Charlie', phone: '0900998899', role: 'Constable Diary', logon_name: 60000, password: '***********',address: 'Some Address',rank: 'level 4', status: 'active',photoUrl: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 4, name: 'Dave', phone: '0900998899', role: 'Patrol', logon_name: 55000, password: '***********',address: 'Some Address',rank: 'level 4', status: 'active',photoUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 5, name: 'Emma', phone: '0900998899', role: 'Constable Diary', logon_name: 80000, password: '***********',address: 'Some Address',rank: 'level 4', status: 'active',photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 6, name: 'Yonatan', phone: '0900998899', role: 'Marketing', logon_name: 50000, password: '***********',address: 'Some Address',rank: 'level 4', status: 'active',photoUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 7, name: 'Addis', phone: '0900998899', role: 'Engineering', logon_name: 75000, password: '***********',address: 'Some Address',rank: 'level 4', status: 'active',photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 8, name: 'Handino', phone: '0900998899', role: 'Patrol', logon_name: 60000, password: '***********',address: 'Some Address',rank: 'level 4', status: 'active',photoUrl: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 9, name: 'Anjejo', phone: '0900998899', role: 'Detective', logon_name: 55000, password: '***********',address: 'Some Address',rank: 'level 4', status: 'active',photoUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 10, name: 'Gebru', phone: '0900998899', role: 'Constable Diary', logon_name: 80000, password: '***********',address: 'Some Address',rank: 'level 4', status: 'active',photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 11, name: 'Alice', phone: '0900998899', role: 'Patrol', logon_name: 50000, password: '***********',address: 'Some Address',rank: 'level 4', status: 'active',photoUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 12, name: 'Bob', phone: '0900998899', role: 'Detective', logon_name: 75000, password: '***********',address: 'Some Address',rank: 'level 4', status: 'active',photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 13, name: 'Charlie', phone: 'charlie@example.com', role: 'Detective', logon_name: 60000, password: '***********',address: 'Some Address',rank: 'level 4', status: 'active',photoUrl: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 14, name: 'Dave', phone: 'dave@example.com', role: 'Patrol', logon_name: 55000, password: '***********',address: 'Some Address',rank: 'level 4', status: 'active',photoUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 15, name: 'Emma', phone: 'emma@example.com', role: 'Patrol', logon_name: 80000, password: '***********',address: 'Some Address',rank: 'level 4', status: 'active',photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 16, name: 'Yonatan', phone: 'alice@example.com', role: 'Constable Diary', logon_name: 50000, password: '***********',address: 'Some Address',rank: 'level 4', status: 'active',photoUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 17, name: 'Addis', phone: 'bob@example.com', role: 'Constable Diary', logon_name: 75000, password: '***********',address: 'Some Address',rank: 'level 4', status: 'active',photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 18, name: 'Handino', phone: 'charlie@example.com', role: 'Patrol', logon_name: 60000, password: '***********',address: 'Some Address',rank: 'level 4', status: 'active',photoUrl: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 19, name: 'Anjejo', phone: 'dave@example.com', role: 'Constable Diary', logon_name: 55000, password: '***********',address: 'Some Address',rank: 'level 4', status: 'active',photoUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 20, name: 'Gebru', phone: 'emma@example.com', role: 'Patrol', logon_name: 80000, password: '***********',address: 'Some Address',rank: 'level 4', status: 'active',photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
      ];

function StaffsDashboard() {
    
    
    return (
      <div className=''>
            <div className=''>
            <StaffTable employees={employees} />
            </div>
      </div>
    );
  }
  export default StaffsDashboard;