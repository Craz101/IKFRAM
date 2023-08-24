import React, {useState, useEffect} from "react";

function SortFilter({gameList, handleSortChange}) {
    const [sortOption, setSortOption] = useState('default');

    useEffect(() => {
        handleSortChange(sortOption);
    }, [sortOption, handleSortChange]);

    return (
        <div className='sort-filter'>
            <select name='sort' id='sort-options' value={sortOption} onChange={e => setSortOption(e.target.value)}>
                <option value='default'>No Sorting</option>
                <option value='ascending'>Ascending Playtime</option>
                <option value='descending'>Descending Playtime</option>
            </select>
        </div>
    );
}

export default SortFilter;