import { Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@mui/material';
import PropTypes from 'prop-types';

function MainSnackBar(props) {
    return (
        <Snackbar open={props.error !== undefined} autoHideDuration={6000} onClose={() => { props.setError(undefined) }}>
            <Alert severity="error" sx={{ width: '100%' }}>
                <AlertTitle>{props.error?.title}</AlertTitle>
                {props.error?.content}
            </Alert>
        </Snackbar>
    )
}

MainSnackBar.propTypes = {
    error: PropTypes.object,
    setError: PropTypes.func.isRequired,

}

export default MainSnackBar;