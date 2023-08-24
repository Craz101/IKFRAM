import React from "react";

const GameListContext = React.createContext({
    onListChange: () => {},
});

export default GameListContext;