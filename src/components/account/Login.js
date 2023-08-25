import '../../modal/Modal.css'
import React, {useState} from 'react';
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from '../../Firebase';

const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in successfully');
            props.onClose();
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className='new-game'>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                    <button type="submit">Login</button>
                    <button onClick={props.onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
