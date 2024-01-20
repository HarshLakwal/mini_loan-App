import React from 'react'
import UserDashboardPage from '../pages/Dashboard/UserDashboardPage.jsx'
const UserDashboard = () => {
    return (
        <>
            <div className="w-full flex" style={{ background:'#e7e7e7' }}>
                <div className="flex items-start justify-between w-full h-[auto]">
                    <UserDashboardPage />
                </div>
            </div>
        </>
    )
}

export default UserDashboard