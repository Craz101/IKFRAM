import './App.css';
import React, {useEffect, useState} from "react";
import ListManagement from "./components/list-management/ListManagement";
import {auth} from "./Firebase";
import AccountBar from "./components/AccountBar";


function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Firebase auth state listener
        const unsubscribe = auth.onAuthStateChanged((loggedInUser) => {
            if (loggedInUser) {
                setUser(loggedInUser);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <React.Fragment>
            <div className='account-bar'>
                <AccountBar/>
            </div>
            {!user ? <div className='mention-login'>
                <h2>Please log in</h2></div> : null}
            {user ? <ListManagement/> : null}
        </React.Fragment>
    );
}

export default App;
