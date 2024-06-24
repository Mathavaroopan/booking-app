import React, { useContext, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';
import Places from './Places';

const Account = () => {
    const {ready, user, setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const logout = async() => {
        await axios.post('/logout');
        setRedirect('/');
        alert("Logout successful")
        setUser(null);
    }
    if(ready && !user && !redirect) {
        return <Navigate to='/login' />;
    }

    let {subpage} = useParams();
    console.log(subpage);

    const linkClasses = (type = null) => {
        if(type == subpage) return "inline-flex gap-1 py-2 px-6 bg-primary text-white rounded-full"
        else return "py-2 px-6 inline-flex gap-1 bg-gray-200 rounded-full"
    }

    if(redirect) return <Navigate to={redirect} />
  return (
    <div>
      <nav className='w-full flex justify-center mt-8 gap-4'>
        <Link className={linkClasses('profile')} to={'/account/profile'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>
            My Profile
        </Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
            </svg>
            My Bookings
        </Link>
        <Link className={linkClasses('places')} to={'/account/places'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
            My accommodations
        </Link>
      </nav>
      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto'>
            Logged in as {user.name} {user.email}
            <br />
            <button className='primary max-w-sm mt-2' onClick={logout}>Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <Places />
      )}
    </div>
  )
}

export default Account
