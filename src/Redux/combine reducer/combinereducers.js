import { combineReducers } from "redux";
import { GET_USER_ID } from "../reducers/GET_ID";
import { GET_NAME_REDUCER } from "../reducers/GET_NAME";
import { GET_DATA_REDUCER } from "../reducers/FETCH_DATA";
import { FILTER_DATA_REDUCER } from "../reducers/FILTER_DATA";

export const RootReducer = combineReducers({
    GET_USER_ID,
    GET_NAME_REDUCER,
    GET_DATA_REDUCER,
    FILTER_DATA_REDUCER
})
