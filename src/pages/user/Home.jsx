import React from 'react';
import Header from '../../Component/user/Header/Header';


function Home() {

  
  return (
    <div className="bg-gray-100 min-h-screen ">
      {/* Header */}
   <Header/>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Post 1 */}
        <div className="min-h-screen flex items-center justify-center bg-[#091C1B] py-12 px-4 sm:px-6 lg:px-8 ">
          {/* User Info */}
          

          {/* Post Image */}
       
          <h5 style={{ fontSize: '70px', color: 'white' }}>Home Page</h5>

          {/* Like & Comment Buttons */}
          <div className="flex justify-between p-2">
            <div className="flex space-x-2">
              <button className="text-red-600 hover:text-red-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {/* Heart icon */}
                </svg>
              </button>
            
            </div>
           
          </div>

          {/* Likes */}
    

          {/* Comments */}
          <div className="px-4 py-2">
           
          </div>

          {/* Comment Input */}
        
        </div>

        {/* Add more posts here */}
      </main>
    </div>
  );
}

export default Home;
