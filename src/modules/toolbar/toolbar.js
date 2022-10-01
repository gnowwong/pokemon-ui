import { Checkbox } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function FavouriteCheckBox({ showFavourite, setShowFavourite }) {
    return <div>
        <Checkbox
            checked={showFavourite ?? false}
            onChange={() => { setShowFavourite(!showFavourite); }}
        />
        Show Favourite
    </div>
}

function SearchText({ handleChange }) {
    const [searchValue, setSearchValue] = useState('');
    const { loading } = useSelector(state => state.pokemon);  

    const onChange = (searchText) => {
        setSearchValue(searchText ?? "");
        if (handleChange) {
            handleChange(searchText);
        }
    };

    return <SearchBar
        className="pokemon-search-bar"
        placeholder={"Press enter to search"}
        value={searchValue}
        onRequestSearch={onChange}
        onCancelSearch={onChange}
        disabled={loading}
        onChange={onChange}
    />
}

function MainToolBar(props) {
    return (
        <div className="enchanced-toolbar">
            <FavouriteCheckBox showFavourite={props.showFavourite} setShowFavourite={props.setShowFavourite} />
            <SearchText handleChange={props.handleChange} />
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
