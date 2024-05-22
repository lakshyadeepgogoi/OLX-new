import React from 'react'
import ProfileNav from '../components/ProfileNav'
import ProfileDetails from '../components/ProfileDetails'

const Profile = ({ isLoggedIn }) => {
  return (
    <div className='overflow-x-auto'>
      <nav className='shadow-md '>
      <ProfileNav />

      </nav>
      <div >
        <ProfileDetails/>
      </div>

    </div>
  )
}

export default Profile
