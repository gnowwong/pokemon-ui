import { combineReducers } from 'redux';
import snackBar from './snack-bar-reducer';
import pokemon from './pokemon-reducer';
import favourite from './favourite-reducer';
import search from './search-reducer';

export const ActionType = {
    SET_MODAL: "SET_MODAL",
    HANDLE_FAVOURITE: "HANDLE_FAVOURITE",
    SET_SEARCH_VALUE: "SET_SEARCH_VALUE",
    CLEAR_SEARCH_VALUE: "CLEAR_SEARCH_VALUE",
    SHOW_FAVOURITE: "SHOW_FAVOURITE",
    CALL_API_SUCCEEDED: "CALL_API_SUCCEEDED",
    CALL_API_FAILED: "CALL_API_FAILED",
    IS_LOADING: "IS_LOADING",
    GET_POKEMON_LIST: "GET_POKEMON_LIST",
    SNACK_BAR_CLOSE: "SNACK_BAR_CLOSE",
    POKEMON_LIST: "POKEMON_LIST",
    GET_POKEMON_DETAIL: "GET_POKEMON_DETAIL",
    SEARCH_POKEMON_DETAIL: "SEARCH_POKEMON_DETAIL",
    SET_POKEMON_DETAIL: "SET_POKEMON_DETAIL",
    CLEAR_POKEMON_DETAIL: "CLEAR_POKEMON_DETAIL",
    SET_POKEMON_LIST_ROW: "SET_POKEMON_LIST_ROW",
    SET_SEARCH_POKEMON_LIST_ROW: "SET_SEARCH_POKEMON_LIST_ROW",
    SET_POKEMON_LIST_ROW_COUNT: "SET_POKEMON_LIST_ROW_COUNT",
}

export const getPokemonList = (payload) => {
    return {
        type: ActionType.GET_POKEMON_LIST,
        payload: payload
    }
}

export const handleFavourite = (payload) => {
    return {
        type: ActionType.HANDLE_FAVOURITE,
        payload: payload
    }
}

export const setShowFavourite = (payload) => {
    return {
        type: ActionType.SHOW_FAVOURITE,
        payload: payload
    }
}

export const setModal = (payload) => {
    return {
        type: ActionType.SET_MODAL,
        payload: payload
    }
}

export const setSearchValue = (payload) => {
    return {
        type: ActionType.SET_SEARCH_VALUE,
        payload: payload
    }
}

export const clearSearchValue = () => {
    return {
        type: ActionType.CLEAR_SEARCH_VALUE
    }
}

export const pokemonList = (payload) => {
    return {
        type: ActionType.POKEMON_LIST,
        payload: payload
    }
}

export const getPokemonDetails = (payload) => {
    return {
        type: ActionType.GET_POKEMON_DETAIL,
        payload: payload
    }
}

export const setPokemonDetails = (payload) => {
    return {
        type: ActionType.SET_POKEMON_DETAIL,
        payload: payload
    }
}

export const clearPokemon = () => {
    return {
        type: ActionType.CLEAR_POKEMON_DETAIL
    }
}

export const setRows = (payload) => {
    return {
        type: ActionType.SET_POKEMON_LIST_ROW,
        payload: payload
    }
}

export const setSearchRows = (payload) => {
    return {
        type: ActionType.SET_SEARCH_POKEMON_LIST_ROW,
        payload: payload
    }
}

export const setRowCount = (payload) => {
    return {
        type: ActionType.SET_POKEMON_LIST_ROW_COUNT,
        payload: payload
    }
}


function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'INCREMENT_IF_ODD':
            return (state % 2 !== 0) ? state + 1 : state
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}



export default combineReducers({
    favourite,
    snackBar,
    pokemon,
    counter,
    search,
});