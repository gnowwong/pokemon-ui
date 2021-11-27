import { Checkbox } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import PropTypes from 'prop-types';
import { useState } from 'react';

function MainToolBar(props) {
    const [searchValue, setSearchValue] = useState('');

    const handleChange = (searchText) => {
        setSearchValue(searchText ?? "");
        if (props.handleChange) {
            props.handleChange(searchText);
        }
    };

    return (
        <div className="enchanced-toolbar">
            <div>
                <Checkbox
                    checked={props.showFavourite ?? false}
                    onChange={() => { props.setShowFavourite(!props.showFavourite); }}
                />
                Show Favourite
            </div>
            <SearchBar
                className="pokemon-search-bar"
                placeholder={"Press enter to search"}
                value={searchValue}
                onRequestSearch={handleChange}
                onCancelSearch={handleChange}
                disabled={props.loading}
                onChange={handleChange}
            />
        </div>
    )
}

MainToolBar.propTypes = {
    loading: PropTypes.bool.isRequired,
    showFavourite: PropTypes.bool.isRequired,
    setShowFavourite: PropTypes.func.isRequired,
    rows: PropTypes.array.isRequired,
    setRows: PropTypes.func.isRequired,
}

export default MainToolBar;
