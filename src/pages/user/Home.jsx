import React,{useState} from 'react';
import UserSidebar from '../../Component/user/UserSidebar'
import UserHome from '../../Component/user/UserHome';
import Message from '../../Component/user/Message';
import Create from '../../Component/user/Create';
import Profile from '../../Component/user/Profile';
import UserProfile from '../../Component/user/UserProfile';


function Home() {

  const [activePage, setActivePage] = useState('home');
  const [postOwnerId, setPostOwnerId] = useState(null);
  const setHomeActive = () => {
    setActivePage('home');
  }
  
  const currentUserProfile=()=>{
    setActivePage('profile');
  }
  const setProfileActive = (userId) => {
    console.log(userId,"profileeeeeeeeeeeeeeeeeesetttttttttttttttt");
    setActivePage('userprofile');
    setPostOwnerId(userId); // Set the post owner's ID to the state
  };
  return (
    <div className="h-screen bg-gray-900">
    <div className="h-2"></div>
    <div className="flex h-screen">
      <div className="md:flex-shrink-0 w-16 md:w-64 bg-[#030712] text-white ml-3 rounded-lg" style={{ border: '2px solid #083344', position: 'sticky', top: '0', height: '100vh' }}>
        <div>
          <UserSidebar setActivePage={setActivePage} />
        </div>
      </div>
      <div className="h-4/4 w-1"></div>
      <div className="flex-1 p-4 mr-2 text-white rounded-lg" style={{ border: '2px solid #083344', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto' }}>
        {activePage === 'home' && <UserHome  
        setProfileActive={setProfileActive}
        currentUserProfile={currentUserProfile}
        />}
        {activePage === 'create' && <Create  setHomeActive={setHomeActive} />}
        {activePage === 'message' && <Message />}
        {activePage === 'profile' && <Profile />}
        {activePage === 'userprofile' && postOwnerId && <UserProfile userId={postOwnerId} />}
      </div>
    </div>
  </div>
  

  
  );
}

export default Home;