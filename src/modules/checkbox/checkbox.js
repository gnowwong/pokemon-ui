import { Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';

function MainCheckBox(props) {
    const details = props.details;
    return <Checkbox
        onChange={(e) => props.handleFavouriteChange({ ...details.row, isFavourite: !details.row.isFavourite })}
        defaultChecked={details.row.isFavourite}
        value={details.row.isFavourite}
        checkedIcon={<>⭐</>} icon={<>➖</>}
    />
}

MainCheckBox.propTypes = {
    handleFavouriteChange: PropTypes.func.isRequired,
    details: PropTypes.object.isRequired,
}

export default MainCheckBox;