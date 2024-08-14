import { ActionType } from "./root-reducer";

const favouriteInitState = {
    favouriteList: [],
    showFavourite: false,
}

export default function favourite(state = favouriteInitState, action) {
    switch (action.type) {
        case ActionType.HANDLE_FAVOURITE: {
            const _state = { ...state };
            console.log("add favourite");
            if (_state.favouriteList.findIndex(x => x.name === action.payload.name) > -1) {
                _state.favouriteList = _state.favouriteList.filter(x => x.name !== action.payload.name);
            }
            else {
                _state.favouriteList = [...state.favouriteList, action.payload];
            };
            return _state
        }
        case ActionType.SHOW_FAVOURITE: {
            const _state = { ...state };
            _state.showFavourite = action.payload
            return _state
        }
        default:
            return state;

    }
};