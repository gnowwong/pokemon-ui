import { SEVERITY } from "../../constant/constant";
import { ActionType } from "./root-reducer";

const apiResponseInitOpenState = {
    snackBar: { open: true, autoHideDuration: 6000 },
};
const apiResponseInitState = {
    snackBar: { open: false, autoHideDuration: 6000 },
};

export const snackBarClose = () => {
    return {
        type: ActionType.SNACK_BAR_CLOSE
    }
}

export const apiCallFailed = (payload) => {
    return {
        type: ActionType.CALL_API_FAILED,
        payload: payload
    }
}

export const apiCallSucceed = () => {
    return {
        type: ActionType.SNACK_BAR_CLOSE
    }
}

export default function snackBar(state = apiResponseInitState, action) {
    switch (action.type) {
        case ActionType.CALL_API_FAILED: {
            return {
                ...apiResponseInitOpenState,
                alert: { severity: SEVERITY.ERROR, },
                alertTitle: { error: { title: action.payload }, }
            }
        }
        case ActionType.CALL_API_SUCCEEDED: {
            return {
                ...apiResponseInitOpenState,
                alert: { severity: SEVERITY.SUCCESS, },
                alertTitle: { error: { title: "sucess" }, }
            }
        }
        case ActionType.SNACK_BAR_CLOSE: {
            return apiResponseInitState;
        }
        default:
            return state;

    }
};