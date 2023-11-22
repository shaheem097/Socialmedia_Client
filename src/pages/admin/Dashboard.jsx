import React, { useState } from 'react';
import Sidebar from '../../Component/admin/Sidebar';
import UserManagment from '../../Component/admin/UserManagment';
import Report from '../../Component/admin/Report';
import PostManagment from '../../Component/admin/PostManagment';
import AdminHome from '../../Component/admin/AdminHome';

function Dashboard() {
  const [activePage, setActivePage] = useState('dashboard'); // Default to User Management

  return (
    <div className="h-screen bg-gray-900">
  
  
    <div className="h-2"></div>
  
    <div className="flex h-screen bg-gray-900">
    <div className="md:flex-shrink-0 w-16 md:w-64 bg-[#030712] text-white ml-3 rounded-lg" style={{ border: '2px solid #083344', position: 'sticky', top: '0', height: '100vh' }}>
        <div>
            <Sidebar setActivePage={setActivePage} />
          </div>
        </div>
      <div className="h-4/4 w-1"></div>
      <div className="flex-1 p-4 bg-[#030712] mr-2 text-white rounded-lg" style={{ border: '2px solid #083344', display: 'flex', flexDirection: 'column', alignItems: 'center',overflowY: 'auto' }}>
            {activePage === 'dashboard' && <AdminHome />}
            {activePage === 'user' && <UserManagment />}
            {activePage === 'post' && <PostManagment />}
            {activePage === 'report' && <Report />}
      </div>
    </div>
  </div>
  
  );
}

export default Dashboard;
