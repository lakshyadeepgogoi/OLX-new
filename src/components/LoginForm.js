import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth } from '../pages/firebase';

const LoginForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const changeHandler = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            // Set the authentication persistence to "local"
            await setPersistence(auth, browserLocalPersistence);
            // Set the expiration time for the authentication token to 10 days
            const expirationTime = new Date().getTime() + (10 * 24 * 60 * 60 * 1000); // 10 days in milliseconds
            localStorage.setItem('expirationTime', expirationTime);
            setIsLoggedIn(true);
            toast.success('Logged In');
            console.log('User:', userCredential.user);
            navigate('/profile');
        } catch (error) {
            toast.error('Invalid ID and Password');
            console.error('Error:', error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            // Set the authentication persistence to "local"
            await setPersistence(auth, browserLocalPersistence);
            // Set the expiration time for the authentication token to 10 days
            const expirationTime = new Date().getTime() + (10 * 24 * 60 * 60 * 1000); // 10 days in milliseconds
            localStorage.setItem('expirationTime', expirationTime);
            setIsLoggedIn(true);
            toast.success('Logged In with Google');
            console.log('User:', userCredential.user);
            navigate('/profile');
        } catch (error) {
            toast.error('Failed to sign in with Google');
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-y-4 mt-6">
            <label className='w-full'>
                <p className='text-sm text-gray-800 mb-1'>
                    Email Address <sup className='text-pink-200'>*</sup>
                </p>
                <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder="Enter email address"
                    name="email"
                    className=' rounded-md bg-gray-100 text-gray-800 w-full px-4 py-2'
                />
            </label>

            <label className='w-full relative'>
                <p className='text-sm text-gray-800 mb-1'>
                    Password <sup className='text-pink-200'>*</sup>
                </p>
                <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder="Enter Password"
                    name="password"
                    className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'
                />

                <span
                    className='absolute right-3 top-[30px] cursor-pointer'
                    onClick={() => setShowPassword(prev => !prev)}>
                    {showPassword ?
                        (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :
                        (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                </span>

                <Link to="#">
                    <p className='text-xs mt-1 text-blue-600 max-w-max ml-auto'>
                        Forgot Password
                    </p>
                </Link>
            </label>

            <button type="submit" className='bg-yellow-400 rounded-md text-gray-800 font-semibold py-2 mt-6'>
                Sign In
            </button>
            {/* <button onClick={handleGoogleSignIn} className='bg-red-500 rounded-md text-gray-800 font-semibold py-2 mt-2'>
                Sign In with Google
            </button> */}
            <Link to="/Signup" className='text-center text-sm text-gray-600 mt-2'>
                Don't have an account? Sign Up
            </Link>

        </form>
    )
}

export default LoginForm;
