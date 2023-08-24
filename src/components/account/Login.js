// LoginForm.js
import React, {useState} from 'react';
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from '../../Firebase';
import Modal from "../../modal/Modal"; // Import the auth instance from Firebase.js

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in successfully');
        } catch (error) {
            console.log(auth);
            console.error('Error logging in:', error);
        }
    };

    return (
        <Modal>
            <div className='log-in-container'>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
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
                    <button type="submit">Login</button>
                </form>
            </div>
        </Modal>
    );
};

export default LoginForm;
