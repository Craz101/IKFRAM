import './App.css';
import React, {useEffect, useState} from "react";
import ListManagement from "./components/list-management/ListManagement";
import {auth} from "./Firebase";


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
        <ListManagement/>
    );
}

export default App;
