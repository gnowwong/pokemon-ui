import { combineReducers } from 'redux';

const ActionType = {
    SET_MODAL: "SET_MODAL",
    HANDLE_FAVOURITE: "HANDLE_FAVOURITE",
}

export const handleFavourite = (payload) => {
    return {
        type: ActionType.HANDLE_FAVOURITE,
        payload: payload
    }
}

const favouriteInitState = [];
function favourite(state = favouriteInitState, action) {
    switch (action.type) {
        case ActionType.HANDLE_FAVOURITE: {
            if(state.findIndex(x => x.name === action.payload.name) > -1)
            {
                return state.filter(x => x.name !== action.payload.name);
            }
            else
            {
            
                return [...state, action.payload];
            }
        }
        default:
            return state;

    }
};

export const setModal = (payload) => {
    return {
        type: ActionType.SET_MODAL,
        payload: payload
    }
}

export default combineReducers({
    favourite,
  });