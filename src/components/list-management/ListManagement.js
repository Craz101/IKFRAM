import './game-lists/Game'
import './ListManagement.css';
import AddGame from "./managing/AddGame";
import React, {useState, useEffect, useCallback} from "react";
import GameList from "./game-lists/GameList"
import GameListContext from "../../context/GameListContext";
import {auth} from "../../Firebase";
import Modal from "../../modal/Modal";

function ListManagement() {

    const [isLoading, setIsLoading] = useState(false);
    const [gameList, setGameList] = useState([]);
    const [newGameEntry, setNewGameEntry] = useState(false);
    const [error, setError] = useState(null);

    const fetchGameListHandler = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch('https://ikfram-6bb34-default-rtdb.europe-west1.firebasedatabase.app/' + auth.currentUser.uid + '/gamelist.json');
            if (!response.ok) {
                throw new Error('Error loading games');
            }
            const returnedData = await response.json();
            const loadedGameList = [];
            for (const key in returnedData) {
                loadedGameList.push({
                    id: key,
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

    useEffect( () => {
        fetchGameListHandler().then(() => {});
    }, [fetchGameListHandler]);

    async function storeGameHandler(game) {
        try {
            const response = await fetch('https://ikfram-6bb34-default-rtdb.europe-west1.firebasedatabase.app/' + auth.currentUser.uid + '/gamelist.json', {
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

            <div className='app-content'>
                <button onClick={openNewGameList}> Add New Game</button>
                <div className='status-message'>
                    {!isLoading && error && <h2>{error}</h2>}
                    {isLoading && <h2>Loading Games...</h2>}
                </div>
                {!isLoading && gameList.length > 0 && <GameList gameList={gameList}/>}
                {!isLoading && gameList.length === 0 && !error && <h2>No Games Found</h2>}
                <Modal open={newGameEntry} onClose={() => setNewGameEntry(false)}>
                    <AddGame onSaveGameData={storeGameHandler} onClose={closeNewGameList}/>
                </Modal>

            </div>
        </GameListContext.Provider>
    );
}

export default ListManagement;
