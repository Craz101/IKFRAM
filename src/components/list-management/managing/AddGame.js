import './AddGame.css';
import React, {useState} from "react";
import Modal from "../../../modal/Modal";
import { auth } from '../../../Firebase';

const AddGame = (props) => {
    const initialUserInput = {
        'game-name': '',
        'game-genre': '',
        'game-length': '',
        'image-url': '',
        'currently-playing': false,
        'game-completed': false,
        'user-id': auth.currentUser.email
    };
    const [userInput, setUserInput] = useState(initialUserInput);
    const [isValid, setIsValid] = useState(true);
    const resetHandler = () => {
        setUserInput(initialUserInput);
    }

    const inputChangeHandler = (input, value) => {
        setUserInput((prevInput) => {
            if (!isValid) {
                setIsValid(true);
            }
            return {
                ...prevInput,
                [input]: value
            };
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (userInput["game-name"] === ''
            || userInput["game-genre"] === ''
            || userInput["game-length"] === '') {
            setIsValid(false);
            return;
        }
        if (isValid) {
            const newGameData = {
                name: userInput["game-name"],
                genre: userInput["game-genre"],
                length: userInput["game-length"],
                imageUrl: userInput["image-url"],
                currentlyPlaying: userInput["currently-playing"],
                completed: userInput["game-completed"],
                userId: userInput["user-id"]
            };
            console.log(newGameData);
            props.onSaveGameData(newGameData);
            resetHandler();
            props.onClose();
        }
    }

    return (
        <Modal onClose={props.onClose}>
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
                            <label> Game Image URL</label>
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
                        <button type='submit'> Add Game</button>
                        <button onClick={resetHandler} type='reset'> Clear</button>
                        <button onClick={props.onClose}> Cancel</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
export default AddGame;