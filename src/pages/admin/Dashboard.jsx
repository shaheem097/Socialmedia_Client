import React from 'react'
import AdminHeader from '../../Component/admin/AdminHeader';
import Sidebar from '../../Component/admin/Sidebar';
import UserManagment from '../../Component/admin/UserManagment';
import Report from '../../Component/admin/UserManagment';
import PostManagment from '../../Component/admin/PostManagment';


function Dashboard() {
    return (
     <div>
       <AdminHeader/>
       <Sidebar/>
       <UserManagment/>
       <Report/>
       <PostManagment/>
     </div>
       
    
    )
    }
    

export default Dashboard
