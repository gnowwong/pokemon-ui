import { ActionType } from "./root-reducer";

const searchInitState = {
    searchValue: "",
}

export default function search(state = searchInitState, action) {
    switch (action.type) {
        case ActionType.SET_SEARCH_VALUE: {
            const _state = { ...state };
            _state.searchValue = action.payload;
            return _state;
        }
        case ActionType.CLEAR_SEARCH_VALUE: {
            return searchInitState;
        }
        default:
            return state;

    }
};