import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

function MainButton(props) {

    return <Button
        className="pokemon-name-modal"
        onClick={() => props.onClick(props.details)}
        variant="text"
        size="small">{props.details.row.name}
    </Button>
}

MainButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    details: PropTypes.object.isRequired,
}

export default MainButton;