import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { toast } from 'react-hot-toast';
import { auth } from "../pages/firebase";  // Ensure this path is correct
import { RecaptchaVerifier, signInWithPhoneNumber, signInWithCredential, PhoneAuthProvider } from "firebase/auth";

function PhoneAuth() {
    const [number, setNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [verificationId, setVerificationId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const setUpRecaptcha = () => {
            window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    console.log("Recaptcha resolved");
                }
            });
            window.recaptchaVerifier.render();
        };
        setUpRecaptcha();
    }, []);

    const handleCancel = () => {
        navigate('/');
    };

    const handleOtpSend = async (e) => {
        e.preventDefault();
        if (!number) {
            toast.error("Please enter a valid phone number.");
            return;
        }
        try {
            const appVerifier = window.recaptchaVerifier;
            const response = await signInWithPhoneNumber(auth, number, appVerifier);
            setVerificationId(response.verificationId);
            toast.success("OTP has been sent!");
        } catch (error) {
            console.error("Error sending OTP: ", error);
            toast.error("Failed to send OTP");
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        if (!otp || !verificationId) {
            toast.error("Invalid OTP or verification ID");
            return;
        }
        try {
            const credential = PhoneAuthProvider.credential(verificationId, otp);
            const userCredential = await signInWithCredential(auth, credential);
            
            // User is now signed in
            toast.success("Phone verification successful!");
    
            // Here, userCredential.user gives you the user object
            console.log("Signed in user:", userCredential.user);
    
            // Optionally update app state or context with user information
            // This could be a context provider or a Redux store dispatch
            // e.g., setUser(userCredential.user);
    
            // Redirect to a dashboard or homepage after successful login
            navigate('/profile');  // Adjust this path as necessary
        } catch (error) {
            console.error("Error verifying OTP: ", error);
            toast.error("Failed to verify OTP");
        }
    };
    

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleOtpSend} className="space-y-6">
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Phone Number <sup className='text-red-500'>*</sup>
                    </label>
                    <PhoneInput
                        defaultCountry='IN'
                        value={number}
                        onChange={setNumber}
                        placeholder="Enter phone number"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div id='recaptcha-container'></div>
                <div className="flex justify-between">
                    <button type="button" onClick={handleCancel} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition duration-200'>
                        Cancel
                    </button>
                    <button type="submit" className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200'>
                        Send OTP
                    </button>
                </div>
            </form>
            {verificationId && (
                <form onSubmit={verifyOtp} className="space-y-6 mt-6">
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            OTP
                        </label>
                        <input
                            type='text'
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder='Enter OTP'
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200'>
                        Verify OTP
                    </button>
                </form>
            )}
        </div>
    );
}

export default PhoneAuth;
