import { applyMiddleware, createStore } from "redux";
import { RootReducer } from "../combine reducer/combinereducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export const store = createStore(RootReducer,composeWithDevTools(applyMiddleware(thunk)));