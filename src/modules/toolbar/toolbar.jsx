import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Checkbox from "@mui/material/Checkbox";
import { TextField } from '@mui/material';

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

    const onChange = (e) => {
        setSearchValue(e.target.value ?? "");
        if (handleChange) {
            handleChange(e.target.value);
        }
    };

    return <TextField
        className="m-1"
        placeholder={"Press enter to search"}
        value={searchValue}
        disabled={loading}
        onChange={onChange}
    />
}

function MainToolBar(props) {
    return (
        <div className="flex justify-between">
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
