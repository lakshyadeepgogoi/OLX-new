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
                {/* Form inputs */}
            </form>
        </div>
    );
}

export default SignupForm;
