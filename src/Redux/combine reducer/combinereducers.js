import { combineReducers } from "redux";
import { GET_DATA_REDUCER } from "../reducers/FETCH_DATA";
import { FILTER_DATA_REDUCER } from "../reducers/FILTER_DATA";
import { GET_COMMENTS_REDUCER } from "../reducers/GET_COMMENTS";
import { IS_LOADING_REDUCER } from "../reducers/IS_LOADINGS";
import { IS_UPDATE_REDUCER } from "../reducers/IS_UPDATE";

export const RootReducer = combineReducers({
    GET_DATA_REDUCER,
    FILTER_DATA_REDUCER,
    GET_COMMENTS_REDUCER,
    IS_LOADING_REDUCER,
    IS_UPDATE_REDUCER
})
