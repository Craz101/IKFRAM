// RegisterForm.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth"

import { auth } from '../../Firebase';
import Modal from "../../modal/Modal"; // Import the auth instance from Firebase.js

const RegisterForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User registered successfully');
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <Modal>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Register</button>
                <button onClick={props.onClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default RegisterForm;