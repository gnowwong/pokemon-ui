import { put, takeEvery, all, call, takeLatest } from 'redux-saga/effects'
import { PokemonService } from './axios-service';
import { ActionType, pokemonList, setPokemonDetails, setRowCount, setSearchRows } from './reducers/root-reducer';
import { apiCallFailed, apiCallSucceed } from './reducers/snack-bar-reducer';
import './../helper/stringHelper';

const delay = (ms) => new Promise(res => setTimeout(res, ms))

// Our worker Saga: will perform the async increment task
function* incrementAsync(action) {
    yield delay(1000)
    yield put({ type: 'INCREMENT' })
}

function* getPokemonList(action) {
    try {
        const data = yield call(PokemonService.GetPokemonList, action.payload.seed);
        yield put(apiCallSucceed());
        yield put(pokemonList({
            ...action.payload,
            result: data
        }))
    } catch (error) {
        yield put(apiCallFailed(error))
    }
}

function* getPokemonDetails(action) {
    try {
        const data = yield call(PokemonService.GetPokemonDetail, action.payload);
        yield put(apiCallSucceed());
        yield put(setPokemonDetails(data))
    } catch (error) {
        yield put(apiCallFailed(error))
    }
}

function* searchPokemon(action) {
    try {
        const data = yield call(PokemonService.GetPokemonList, action.payload);
        yield put(apiCallSucceed());

        const searchedRows = action.payload.requestSearch(data.results);
        
        yield put(setRowCount(searchedRows.length));
        yield put(setSearchRows(searchedRows));
    } catch (error) {
        yield put(apiCallFailed(error))
    }
}


// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
    yield takeLatest(ActionType.GET_POKEMON_LIST, getPokemonList)
    yield takeLatest(ActionType.GET_POKEMON_DETAIL, getPokemonDetails)
    yield takeLatest(ActionType.SEARCH_POKEMON_DETAIL, searchPokemon)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        watchAsync()
    ])
}