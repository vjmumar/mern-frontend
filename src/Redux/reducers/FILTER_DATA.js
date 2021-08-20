import { FILTER_DATA_TYPE } from "../types/type";

export const FILTER_DATA_REDUCER = (state = [], action) => {
	switch (action.type) {
		case FILTER_DATA_TYPE:
			return (state = action.payload);
		default:
			return state;
	}
};
