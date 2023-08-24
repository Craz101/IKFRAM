import './game-lists/Game'
import './ListManagement.css';
import AddGame from "./managing/AddGame";
import React, {useState, useEffect, useCallback} from "react";
import GameList from "./game-lists/GameList"
import AccountBar from "../AccountBar";
import GameListContext from "../../context/GameListContext";
import {auth} from "../../Firebase";

function ListManagement() {

    const [isLoading, setIsLoading] = useState(false);
    const [gameList, setGameList] = useState([]);
    const [newGameEntry, setNewGameEntry] = useState(false);
    const [error, setError] = useState(null);

    const fetchGameListHandler = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch('https://ikfram-6bb34-default-rtdb.europe-west1.firebasedatabase.app/gamelist.json');
            if (!response.ok) {
                throw new Error('Error loading games');
            }
            const returnedData = await response.json();
            const loadedGameList = [];

            for (const key in returnedData) {
                loadedGameList.push({
                    key: key,
                    name: returnedData[key].name,
                    genre: returnedData[key].genre,
                    length: returnedData[key].length,
                    imageUrl: returnedData[key].imageUrl,
                    currentlyPlaying: returnedData[key].currentlyPlaying,
                    completed: returnedData[key].completed
                });
            }
            setGameList(loadedGameList);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchGameListHandler().then(r => {
        });
    }, [fetchGameListHandler]);

    async function storeGameHandler(game) {
        try {
            const response = await fetch('https://ikfram-6bb34-default-rtdb.europe-west1.firebasedatabase.app/gamelist.json', {
                method: 'POST',
                body: JSON.stringify(game),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await response.json();
            await fetchGameListHandler();
        } catch (error) {
        }
    }

    function openNewGameList() {
        setNewGameEntry(true);
    }

    function closeNewGameList() {
        setNewGameEntry(false);
    }

    return (
        <GameListContext.Provider
            value={{
                onListChange: fetchGameListHandler
            }}
        >
            <div className='account-bar'>
                <AccountBar/>
                <p></p>
            </div>
            <div className='app-content'>
                <button onClick={openNewGameList}> Add New Game</button>
                <button style={{marginLeft: "16px"}} onClick={fetchGameListHandler}> Fetch Game List</button>
                <div className='status-message'>
                    {!isLoading && error && <p>{error}</p>}
                    {isLoading && <p>Loading Games...</p>}
                </div>
                {!isLoading && gameList.length > 0 && <GameList gameList={gameList}/>}
                {!isLoading && gameList.length === 0 && !error && <p>No Games Found</p>}
                {newGameEntry && <AddGame onSaveGameData={storeGameHandler} onClose={closeNewGameList}/>}

            </div>
        </GameListContext.Provider>
    );
}

export default ListManagement;
