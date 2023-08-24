import './Game.css';
import React, {useContext, useState} from "react";
import EditGame from "../managing/EditGame";
import logo from "../../../resources/Placeholder.png";
import GameListContext from "../../../context/GameListContext";

function Game(props) {

    const ctx = useContext(GameListContext);
    const [editGameEntry, setEditGameEntry] = useState(false);

    function openEditGameList() {
        setEditGameEntry(true);
    }

    function closeEditGameList() {
        setEditGameEntry(false);
        ctx.onListChange().then(r => {});
    }

    return (
        <React.Fragment>
            {editGameEntry && <EditGame props={props} onClose={closeEditGameList}/>}
            <div className={"game-entry"} onClick={openEditGameList}>
                <div className={"game-details"}>
                    <div className='game-image'
                         style={{backgroundImage: props.imageUrl ? "url(" + props.imageUrl + ")" : `url(${logo})`}}>
                        <p>{props.name}</p>
                    </div>
                    <div className='game-text'>
                        <p>Genre</p>
                        <p>Game Length</p>
                        <p>Playing?</p>
                        <p>Completed?</p>
                    </div>
                    <div className='game-text'>
                        <p>{props.genre}</p>
                        <p>{props.length} Hours</p>
                        {props.currentlyPlaying && <p>Yes</p>}
                        {!props.currentlyPlaying && <p>No</p>}
                        {props.completed && <p>Yes</p>}
                        {!props.completed && <p>No</p>}
                    </div>
                </div>
            </div>
        </React.Fragment>);
}

export default Game;