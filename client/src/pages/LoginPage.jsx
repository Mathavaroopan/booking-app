import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { email, password }, { withCredentials: true });
            alert("Login successful");
            console.log("Response data on login page", response.data);
            setUser(response.data);
            setRedirect(true);
            console.log("I'm fine!!");
        } catch (err) {
            console.log(err);
            alert("Error logging in...Please try again...");
        }
    };

    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='flex flex-col mb-40'>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
                    <input type="email" placeholder='your@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='primary'>Login</button>
                    <div className='text-center py-2 text-gray-500'>
                        <span>Don't have an account yet?</span>
                        <Link to={'/register'} className='underline text-black ml-2'>Register Now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
