<div className="flex h-screen">
<div className="flex">
<div className="w-64 bg-gray-900 text-white p-4">
 <Sidebar setActivePage={setActivePage} />
</div>
<div className="flex-1 p-4 bg-red-600">
 {activePage === 'user' && <UserManagment />}
 {activePage === 'post' && <PostManagment />}
 {activePage === 'report' && <Report />}
 {/* Add more conditions for other pages */}
</div>
</div>
</div> 