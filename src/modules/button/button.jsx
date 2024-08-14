import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function MainButton(props) {

    return <Button
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