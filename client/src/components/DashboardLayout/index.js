import React from 'react'

function DashboardLayout({children}) {
  return (
    <div className='dashboard flex flex-col w-2/3 h-screen overflow-auto border-x-2 border-[#c9510c]'>
        {children}
    </div>
  )
}

export default DashboardLayout