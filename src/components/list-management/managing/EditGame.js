import React, {useContext, useState} from "react";
import '../../../modal/Modal.css'
import GameListContext from "../../../context/GameListContext";
import {auth} from "../../../Firebase";


const EditGame = (props) => {

    const initialUserInput = {
        'game-name': props.props.name,
        'game-genre': props.props.genre,
        'game-length': props.props.length,
        'image-url': props.props.imageUrl,
        'currently-playing': props.props.currentlyPlaying,
        'game-completed': props.props.completed,
    }

    const [userInput, setUserInput] = useState(initialUserInput);
    const [isValid, setIsValid] = useState(true);

    const ctx = useContext(GameListContext);

    const inputChangeHandler = (input, value) => {
        setUserInput((prevInput) => {
            if (!isValid) {
                setIsValid(true);
            }
            return {
                ...prevInput,
                [input]: value
            };
        });
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if (userInput["game-name"] === ''
            || userInput["game-genre"] === ''
            || userInput["game-length"] === '') {
            setIsValid(false);
            return;
        }
        if (isValid) {
            const editGameData = {
                id: props.props.id,
                name: userInput["game-name"],
                genre: userInput["game-genre"],
                length: userInput["game-length"],
                imageUrl: userInput["image-url"],
                currentlyPlaying: userInput["currently-playing"],
                completed: userInput["game-completed"]
            };
            await updateGameHandler(editGameData);
        }
        props.onClose();
    }

    async function updateGameHandler(game) {
        try {
            // https://ikfram-6bb34-default-rtdb.europe-west1.firebasedatabase.app/gamelist/-NcOPSZBP4DCxmvH45SH
            const response = await fetch('https://ikfram-6bb34-default-rtdb.europe-west1.firebasedatabase.app/' + auth.currentUser.uid + '/gamelist/' + props.props.id + '.json', {
                method: 'PUT',
                body: JSON.stringify(game),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await response.json();
            await ctx.onListChange();
            props.onClose();
        } catch (error) {

        }
    }

    async function deleteGameHandler() {
        try {
            // https://ikfram-6bb34-default-rtdb.europe-west1.firebasedatabase.app/gamelist/-NcOPSZBP4DCxmvH45SH
            const response = await fetch('https://ikfram-6bb34-default-rtdb.europe-west1.firebasedatabase.app/' + auth.currentUser.uid + '/gamelist/' + props.props.id + '.json', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await response.json();
            await ctx.onListChange;
            props.onClose();
        } catch (error) {

        }
    }

    return (
        <div className='new-game'>
            {!isValid && <p>Game data not valid</p>}
            <form onSubmit={submitHandler}>
                <div className='new-game__controls'>
                    <div className='new-game__control'>
                        <label> Game Name</label>
                        <input type='text' value={userInput["game-name"]}
                               onChange={(event) => inputChangeHandler('game-name', event.target.value)}
                               id='game-name'/>
                    </div>
                    <div className='new-game__control'>
                        <label> Game Genre</label>
                        <input type='text' value={userInput["game-genre"]}
                               onChange={(event) => inputChangeHandler('game-genre', event.target.value)}
                               id='game-genre'/>
                    </div>
                    <div className='new-game__control'>
                        <label> Game Length In Hours</label>
                        <input type='number' min='1' value={userInput["game-length"]}
                               onChange={(event) => inputChangeHandler('game-length', event.target.value)}
                               id='game-length'/>
                    </div>
                    <div className='new-game__control'>
                        <label> Game Image</label>
                        <input type='url' value={userInput["image-url"]}
                               onChange={(event) => inputChangeHandler('image-url', event.target.value)}
                               id='image-url'/>
                    </div>
                    <div className='new-game__control'>
                        <label> Currently Playing</label>
                        <input type='checkbox' checked={userInput["currently-playing"]}
                               onChange={(event) => inputChangeHandler('currently-playing', event.target.checked)}
                               id='currently-playing'/>
                    </div>
                    <div className='new-game__control'>
                        <label> Completed?</label>
                        <input type='checkbox' checked={userInput["game-completed"]}
                               onChange={(event) => inputChangeHandler('game-completed', event.target.checked)}
                               id='game-completed'/>
                    </div>
                    <button type='submit'> Edit Game</button>
                    <button onClick={props.onClose}> Cancel</button>
                    <button type='button' onClick={deleteGameHandler}> Delete</button>
                </div>
            </form>
        </div>
    );
}

export default EditGame;