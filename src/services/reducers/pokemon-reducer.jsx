import { ActionType } from "./root-reducer";

/**
 * 
 * @param {*} state 
 * @param {[]any} [state.rows = []]
 * @param {number} [state.count = 0]
 * @param {number} [state.allCount = 0]
 * @param {number} [state.row = 0]
 * @param {string} [state.next = ""]
 * @param {boolean} [state.loading = true]
 * @param {Object} state.pokemonDetails
 * @param {Object} action 
 * @param {string: ActionType} action.type
 * @param {Object} action.payload
 * @param {Object} action.payload.seed
 * @param {Object} action.payload.result
 * @param {Object} action.payload.result.count
 * @returns 
 */

 const pokemonListInitState = {
    rows: [],
    count: 0,
    allCount: 0,
    row: 0,
    next: "",
    loading: true
}

export default function pokemon(state = pokemonListInitState, action) {
    switch (action.type) {
        case ActionType.POKEMON_LIST: {
            let _state = Object.assign({}, state);
            _state.rows = action.payload.result.results.map((result, index) => {
                return {
                    id: (action.payload.seed) + index,
                    isFavourite: action.payload.favouriteList.findIndex(x => x.name === result.name) > -1,
                    ...result
                };
            });
            _state.count = action.payload.result.count;
            _state.allCount = action.payload.result.count;
            _state.next = action.payload.result.next;
            _state.loading = false;
            return _state;
        }
        case ActionType.SET_POKEMON_LIST_ROW: {
            console.log("setRowsDispatch");
            let _state = Object.assign({}, state);
            _state.rows = action.payload.map((result, index) => {
                return {
                  id: index,
                  isFavourite: _state.rows?.find(x => x.name === result.name)?.isFavourite,
                  ...result
                };
              });
            return _state;
        }
        case ActionType.SET_SEARCH_POKEMON_LIST_ROW: {
            let _state = Object.assign({}, state);
            _state.rows = action.payload;
            return _state;
        }
        case ActionType.SET_POKEMON_LIST_ROW_COUNT: {
            let _state = Object.assign({}, state);
            _state.count = action.payload;
            return _state;
        }
        case ActionType.SET_POKEMON_DETAIL: {
            let _state = Object.assign({}, state);
            _state.pokemonDetails = {
                name: action.payload.name,
                height: action.payload.height,
                weight: action.payload.weight,
                image: action.payload.sprites.front_default,
                abilities: Array.from(action.payload.abilities, x => x.ability.name),
            };
            return _state;
        }
        case ActionType.CLEAR_POKEMON_DETAIL: {
            let _state = Object.assign({}, state);
            _state.pokemonDetails = action.payload;
            return _state;
        }
        default:
            return state;

    }
};