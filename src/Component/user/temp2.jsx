import React from 'react';

function UserManagement() {
  const data = [
    {
      name: "Peter Hernandez",
      job: "Training manager",
      email: "peterkhernandez@rhyta.com",
      created: "30/10/2021"
    },
    {
      name: "Candice Palmieri",
      job: "Landscape contractor",
      email: "candicejpalmieri@armyspy.com ",
      created: "16/06/2020"
    },
    
  ]

  return (<div className="overflow-x-auto w-full">
  <table className="min-w-full">
    <thead className="bg-[#083344] text-left text-gray-100">
      <tr>
        <th className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium uppercase tracking-wide" scope="col">NO</th>
        <th className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium uppercase tracking-wide" scope="col">Name</th>
        <th className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium uppercase tracking-wide" scope="col">Phone</th>
        <th className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium uppercase tracking-wide" scope="col">Email</th>
        <th className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium uppercase tracking-wide" scope="col">Created</th>
       
        <th className="px-2 md:px-4 py-2 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wide" scope="col">Actions</th>
        {/* ... Add your other header columns ... */}
      </tr>
    </thead>
    <tbody>
      {data.map((user, index) => (
        <tr key={user.name} className={`${index % 2 === 0 ? "bg-[#030712]" : "bg-[#0f172a]"} whitespace-nowrap my-1`}>
          <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-200 font-semibold">{index + 1}</td>
          <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-200 font-semibold">{user.name}</td>
            {/* ::User Job Title */}
            <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-400 font-medium">{user.job}</td>
            {/* ::User Email */}
            <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-400 font-medium">{user.email}</td>
            {/* ::User Created Date */}
            <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-400 font-medium">{user.created}</td>
            {/* ::Action Buttons */}
            <td className="px-2 md:px-4 py-2 md:py-3 flex justify-around items-center space-x-2 md:space-x-6 text-xs md:text-sm text-gray-700 font-medium">
              {/* :::delete button */}
              <button
                type="button"
                className="text-xs md:text-sm font-semibold text-white bg-red-500 hover:bg-red-600 px-2 md:px-4 py-1 md:py-2 rounded-md"
              >
                Block
              </button>
            </td>
          {/* ... Add your other table cells ... */}
        </tr>
      ))}
    </tbody>
  </table>
</div>

  )
}

export default UserManagement;
