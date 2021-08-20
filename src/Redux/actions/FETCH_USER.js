import axios from "axios";
import { FILTER_DATA } from "./DATA_ACTIONS";
import { GET_DATA_TYPE, GET_ID_TYPE, GET_NAME_TYPE } from "../types/type";

const myId = localStorage.getItem("myId")

export const DATA_FETCHED = (payload) => {
	return {
		type: GET_DATA_TYPE,
		payload: payload,
	};
};

const filterData = (result) => {
const filterdData = result.find(user => user._id === myId);
return [filterdData];
}

export const FETCH_DATA = () => {
	return (dispatch) => {
		const getUserDetails = axios.get("https://test-api-node1.herokuapp.com/users");
		getUserDetails.then((result) => {
            for (let i = 0 ; i < result.data.length; i++) {
            delete result.data[i].Password;
            }
            dispatch(FILTER_DATA(filterData(result.data)));
            dispatch(DATA_FETCHED(result.data));
			dispatch({ type: GET_ID_TYPE });
			dispatch({ type: GET_NAME_TYPE });
		});
		getUserDetails.catch((err) => {
			throw err;
		});
	};
};
