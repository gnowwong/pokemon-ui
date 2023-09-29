import { Alert, AlertTitle, Snackbar } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function MainSnackBar(props) {
  return (
    <Snackbar
      open={props.error !== undefined}
      autoHideDuration={6000}
      onClose={() => {
        props.setError(undefined);
      }}
    >
      <Alert severity="error" sx={{ width: "100%" }}>
        <AlertTitle>{props.error?.title}</AlertTitle>
        {props.error?.content}
      </Alert>
    </Snackbar>
  );
}

MainSnackBar.propTypes = {
  error: PropTypes.object,
  setError: PropTypes.func.isRequired,
};

export function ApiSnackBar() {
  const snackBar = useSelector((state) => state.snackBar);

  return (
    <Snackbar
      open={snackBar.snackBar.open}
      autoHideDuration={snackBar.snackBar.autoHideDuration}
    >
      <Alert {...snackBar?.alert} sx={{ width: "100%" }}>
        <AlertTitle>{snackBar?.alertTitle?.error?.title}</AlertTitle>
        {snackBar?.alertTitle?.error?.content}
      </Alert>
    </Snackbar>
  );
}

export default MainSnackBar;
