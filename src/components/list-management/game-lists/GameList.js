import './GameList.css';
import '../ListManagement';
import Game from "./Game";
import React, { useEffect, useState } from "react";
import StatusFilter from "./filter/StatusFilter";
import SortFilter from "./filter/SortFilter";

function GameList(props) {

    const [filterOption, setFilterOption] = useState("show-all");
    const [sortOption, setSortOption] = useState("default");
    const [filteredAndSortedGames, setFilteredAndSortedGames] = useState([]);

    useEffect(() => {
        const filteredGames = props.gameList.filter(game => {
            if (filterOption === 'show-all') {
                return true;
            } else if (filterOption === 'currently-playing') {
                return game.currentlyPlaying;
            } else if (filterOption === 'currently-not-playing') {
                return !game.currentlyPlaying;
            } else if (filterOption === 'completed') {
                return game.completed;
            }
            else {
                return 'Something went wrong';
            }
        });

        const sortedGames = [...filteredGames].sort((game1, game2) => {
            const length1 = parseInt(game1.length, 10);
            const length2 = parseInt(game2.length, 10);

            if (sortOption === 'ascending') {
                return length1 - length2;
            } else if (sortOption === 'descending') {
                return length2 - length1;
            }
            return 0;
        });

        setFilteredAndSortedGames(sortedGames);
    }, [filterOption, sortOption, props.gameList]);

    return (
        <React.Fragment>
            <div className='game-list-filters'>
                <StatusFilter filterOption={filterOption} handleFilterChange={setFilterOption} />
                <SortFilter sortOption={sortOption} handleSortChange={setSortOption} />
            </div>
            <div className='game-box'>
                {filteredAndSortedGames.map((game) => (
                    <Game
                        id={game.id}
                        name={game.name}
                        genre={game.genre}
                        length={game.length}
                        imageUrl={game.imageUrl}
                        currentlyPlaying={game.currentlyPlaying}
                        completed={game.completed}
                    />
                ))}
            </div>
        </React.Fragment>
    );
}

export default GameList;
