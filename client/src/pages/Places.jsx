import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Places = () => {
    const {action} = useParams();
  return (
    <div>
        {action !== 'new' && (
            <div className='text-center'>
            <Link className='bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                Add new place
            </Link>
        </div>
        )}
        {action === 'new' && (
            <div>
                <form>
                    <h2 className='text-2xl mt-4'>Title</h2>
                    <p className='text-gray-500 text-sm'>Title for your place.</p>
                    <input type="text" placeholder='title, for example: My lovely apartment...' />
                    <h2 className='text-2xl mt-4'>Address</h2>
                    <p className='text-gray-500 text-sm'>Address to your place</p>
                    <input type="text" placeholder='address' />
                    <h2 className='text-2xl mt-4'>Photos</h2>
                    <p className='text-gray-500 text-sm'>More = Better</p>
                    <div className='flex gap-2'>
                        <input type="text" placeholder="Add using a link ...jpg" />
                        <button className='bg-gray-200 px-4 rounded-2xl'>Add Photo</button>
                    </div>
                    <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                        <button className='flex items-center gap-2 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                            Upload
                        </button>
                    </div>
                    <h2 className='text-2xl mt-4'>Description</h2>
                    <p className='text-gray-500 text-sm'>Description of your place</p>
                    <textarea />
                    <h2 className='text-2xl mt-4'>Perks</h2>
                    <p className='text-gray-500 text-sm'>Select all the perks of your place</p>
                    <div>
                        <label>
                            <input type="checkbox" />
                            <span>Wifi</span>
                        </label>
                        <label>
                            <input type="checkbox" />
                            <span>Free Parking Spot</span>
                        </label>
                        <label>
                            <input type="checkbox" />
                            <span>TV</span>
                        </label>
                        <label>
                            <input type="checkbox" />
                            <span>Pets</span>
                        </label>
                        <label>
                            <input type="checkbox" />
                            <span>Private Entrance</span>
                        </label>
                    </div>
                </form>
            </div>
        )}
    </div>
  )
}

export default Places
