import './AccountBar.css';
import Login from "./account/Login";
import {useState} from "react";
import Register from "./account/Register";
import Modal from '../modal/Modal';
import { auth } from '../Firebase';

function AccountBar() {
    let enteredLoginData = '';
    let enteredRegisterData = '';
    const [loginEntry, setLoginEntry] = useState(false);
    const [registerEntry, setRegisterEntry] = useState(false);

    function openLogin() {
        setLoginEntry(true);
    }

    function closeLogin() {
        setLoginEntry(false);
    }

    function handleLogin(loginData) {
        enteredLoginData = loginData;
        console.log(enteredLoginData);
    }

    function openRegister() {
        setRegisterEntry(true);
    }

    function closeRegister() {
        setRegisterEntry(false);
    }

    function handleRegister(registerData) {
        enteredRegisterData = registerData;
        console.log(enteredRegisterData)
    }

    async function logOut() {
        enteredLoginData = null;
        await auth.signOut();
    }

    const isAuthenticated = auth.currentUser;

    const register = <li><button onClick={openRegister}>Register</button></li>;
    const login = <li><button onClick={openLogin}>Log In</button></li>;

    const greeting = auth.currentUser ? <li><span>{auth.currentUser.email}</span></li> : <></>;
    const logout = <li><button onClick={logOut}>Log Out</button></li>;

    return (
        <div>
            <Modal open={loginEntry} onClose={() => setLoginEntry(false)}>
                <Login
                    onLoginAttempt={handleLogin}
                    onConfirm={() => closeRegister(false)}
                    onClose={() => closeLogin(false)}
                />
            </Modal>

            <Modal open={registerEntry} onClose={() => setRegisterEntry(false)}>
                <Register
                    onRegisterAttempt={handleRegister}
                    onConfirm={() => closeRegister(false)}
                    onClose={() => closeRegister(false)}
                />
            </Modal>
            <div className='nav'>
                <ul>
                    <li>
                        Account
                    </li>
                    { !isAuthenticated && register }
                    { !isAuthenticated && login }
                    { isAuthenticated && greeting }
                    { isAuthenticated && logout }
                </ul>
            </div>
        </div>
    );
}

export default AccountBar;