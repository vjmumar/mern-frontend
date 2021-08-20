import { GET_DATA_TYPE } from "../types/type";

export const GET_DATA_REDUCER = (state = [], action) => {
	switch (action.type) {
		case GET_DATA_TYPE:
			return state = action.payload;
		default:
			return state;
	}
};
