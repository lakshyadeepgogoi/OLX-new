import React from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth'; // Import setPersistence
import { db, auth } from '../pages/firebase';
import { toast } from 'react-hot-toast';
import { IoIosPhonePortrait } from 'react-icons/io';
import { onAuthStateChanged } from 'firebase/auth';

const Template = ({ title, image, formtype, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleGoogleSignup = async () => {
        try {
            const provider = new GoogleAuthProvider();
            // Set the authentication persistence to "local"
            await setPersistence(auth, browserLocalPersistence);

            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            const firstName = user.displayName.split(' ')[0];
            const lastName = user.displayName.split(' ')[1];
            const email = user.email;

            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: firstName,
                lastName: lastName,
                email: email
            });

            setIsLoggedIn(true);
            toast.success('Account Created with Google');
            navigate('/profile');
        } catch (error) {
            toast.error(error.message);
        }
    };

    onAuthStateChanged(auth, (user) => {
        if (user) {
         
          setIsLoggedIn(true);
          navigate('/profile');
        }
      });

    const handlePhoneAuth = () => {
        navigate('/phone-auth');
    };

    return (
        <div className="flex justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-x-8 gap-y-0">
            <div className="relative w-11/12 max-w-[450px] hidden sm:block">
                <img src={image} alt="Students" width={558} height={490} loading="lazy" className="absolute -top-4 right-4 rounded-lg" />
            </div>

            <div className="w-11/12 max-w-[450px]">
                <h1 className="text-black font-semibold text-[1.875rem] leading-[2.375rem]">{title}</h1>
                {formtype === 'signup' ? <SignupForm setIsLoggedIn={setIsLoggedIn} /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
                <div className="flex w-full items-center my-4 gap-x-2">
                    <div className="w-full h-[1px] bg-richblack-700"></div>
                    <p className="text-richblack-700 font-medium">OR</p>
                    <div className="w-full h-[1px] bg-richblack-700"></div>
                </div>
                <div>
                    <button className="w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100 border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6" onClick={handleGoogleSignup}>
                        <FcGoogle /><p>Sign Up with Google</p>
                    </button>
                    <button className="w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100 border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6" onClick={handlePhoneAuth}>
                        <IoIosPhonePortrait /><p>Continue with Phone</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Template;
