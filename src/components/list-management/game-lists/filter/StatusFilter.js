import React, { useState, useEffect } from "react";

function StatusFilter({ gameList, handleFilterChange }) {
    const [filterOption, setFilterOption] = useState("show-all");

    useEffect(() => {
        handleFilterChange(filterOption);
    }, [filterOption, handleFilterChange]);

    return (
        <div className='status-filter'>
            <select name='filter' id='filter-options' value={filterOption} onChange={e => setFilterOption(e.target.value)}>
                <option value='show-all'>No Filter</option>
                <option value='currently-playing'>Currently Playing</option>
                <option value='currently-not-playing'>Currently Not Playing</option>
                <option value='completed'>Completed Games</option>
            </select>
        </div>
    );
}

export default StatusFilter;
