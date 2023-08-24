import './AccountBar.css';
import Login from "./account/Login";
import {useState} from "react";
import Register from "./account/Register";

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

    function logOut() {
        enteredLoginData = null;
    }

    return (
        <div>
            {loginEntry && <Login onLoginAttempt={handleLogin} onConfirm={closeLogin}/>}
            {registerEntry && <Register onRegisterAttempt={handleRegister} onConfirm={closeRegister}/>}
            <div className='nav'>
                <ul>
                    <li>
                        Account
                    </li>
                    <li>
                        <button onClick={openRegister}>Register</button>
                    </li>
                    <li>
                        <button onClick={openLogin}>Log In</button>
                    </li>
                    <li>
                        <button onClick={logOut}>Log Out</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AccountBar;