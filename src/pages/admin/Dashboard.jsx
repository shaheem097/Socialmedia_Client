import React, { useState } from 'react';
import Sidebar from '../../Component/admin/Sidebar';
import UserManagment from '../../Component/admin/UserManagment';
import Report from '../../Component/admin/Report';
import PostManagment from '../../Component/admin/PostManagment';
import AdminHome from '../../Component/admin/AdminHome';
import AdminHeader from '../../Component/admin/AdminHeader';

function Dashboard() {
  const [activePage, setActivePage] = useState('dashboard'); // Default to User Management

  return (
    <div className="h-screen bg-gray-900">
    <div className="sticky top-0 z-10 w-6/7 mx-auto bg-[#030712] rounded-lg ml-3 mr-3" style={{ border: '2px solid #083344' }}>
      <AdminHeader />
    </div>
  
    <div className="h-2"></div>
  
    <div className="flex h-screen bg-gray-900">
    <div className="md:flex-shrink-0 w-14 md:w-64 bg-[#030712] text-white ml-3 rounded-lg" style={{ border: '2px solid #083344', height: '100vh' }}>
          <div style={{ position: 'sticky', top: '0', height: '100%' }}>
            <Sidebar setActivePage={setActivePage} />
          </div>
        </div>
      <div className="h-4/4 w-1"></div>
      <div className="flex-1 p-4 bg-[#030712] mr-2 text-white rounded-lg" style={{ border: '2px solid #083344', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
