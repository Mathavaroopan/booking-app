import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const registerUser = async (ev) => {
        ev.preventDefault();
        try{
            await axios.post('/register', {
                name, email, password
            });    
            alert("Registration Successful. Now you can log in...");    
        } catch(err){
            alert("Registration failed. Please try again later");
        }
    }
  return (
    <div className='mt-4 grow flex items-center justify-around'>
        <div className='flex flex-col mb-40'>
            <h1 className='text-4xl text-center mb-4'>Register</h1>
            <form className='max-w-md mx-auto' onSubmit={registerUser}>
                <input type="text" placeholder='your name' value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="email" placeholder='your@email.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className='primary'>Register</button>
                <div className='text-center py-2 text-gray-500'>
                    <span>Already have an account?</span>
                    <Link to={'/login'} className='underline text-black ml-2'>Login</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default RegisterPage
