// RegisterForm.js
import React, {useState} from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth"

import {auth} from '../../Firebase'; // Import the auth instance from Firebase.js
import '../../modal/Modal.css'

const RegisterForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User registered successfully');
            props.onClose();
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className='new-game'>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className='new-game__control'>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='new-game__control'>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='submit-button'>
                    <button type="submit">Register</button>
                    <button onClick={props.onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;