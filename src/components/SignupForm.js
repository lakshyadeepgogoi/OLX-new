import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth'; // Import setPersistence
import { db, auth } from '../pages/firebase';

const SignupForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function changeHandler(event) {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

    async function submitHandler(event) {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            // Set the authentication persistence to "local"
            await setPersistence(auth, browserLocalPersistence);

            const user = userCredential.user;

            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: formData.name,
                email: formData.email
            });

            setIsLoggedIn(true);
            toast.success("Account Created");
            navigate("/profile");
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div>
        <form onSubmit={submitHandler}>
            <div className='mt-[20px]'>
                <label className='w-full mt-[20px]'>
                    <p className='text-[0.875rem] text-black mb-1 leading-[1.375rem]'>Name<sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type="text"
                        name="name"
                        onChange={changeHandler}
                        placeholder="Enter Your Name"
                        value={formData.name}
                        className=' bg-gray-100 text-gray-800 rounded-[0.5rem]  w-full p-[12px]'
                    />
                </label>
            </div>
            <div className='mt-[20px]'>
                <label className='w-full mt-[20px]'>
                    <p className='text-[0.875rem] text-black mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type="email"
                        name="email"
                        onChange={changeHandler}
                        placeholder="Enter Email Address "
                        value={formData.email}
                        className=' rounded-[0.5rem]  bg-gray-100 text-gray-800 w-full p-[12px]'
                    />
                </label>
            </div>
            <div className='w-full flex gap-x-4 mt-[20px]'>
                <label className='w-full relative'>
                    <p className='text-[0.875rem] text-black mb-1 leading-[1.375rem]'>Create Password<sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type={showPassword ? ("text") : ("password")}
                        name="password"
                        onChange={changeHandler}
                        placeholder="Enter Password"
                        value={formData.password}
                        className=' rounded-[0.5rem]  bg-gray-100 text-gray-800 w-full p-[12px]'
                    />
                    <span
                        className='absolute right-3 top-[38px] cursor-pointer hidden md:block'
                        onClick={() => setShowPassword(prev => !prev)}>
                        {showPassword ?
                            (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :
                            (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                    </span>
                </label>

                <label className='w-full relative'>
                    <p className='text-[0.875rem] text-black mb-1 leading-[1.375rem]'>Confirm Password<sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type={showConfirmPassword ? ("text") : ("password")}
                        name="confirmPassword"
                        onChange={changeHandler}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        className='rounded-[0.5rem]  bg-gray-100 text-gray-800 w-full p-[12px]'
                    />
                    <span
                        className='absolute right-3 top-[38px] cursor-pointer hidden md:block'
                        onClick={() => setShowConfirmPassword(prev => !prev)}>
                        {showConfirmPassword ?
                            (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :
                            (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                    </span>
                </label>
            </div>
            <button className=' w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
                Create Account
            </button>
        </form>
    </div>
    );
}

export default SignupForm;
