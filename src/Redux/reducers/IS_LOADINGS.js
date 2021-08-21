import { IS_LOADING_TYPE } from "../types/type";

export const IS_LOADING_REDUCER = (state = false, action) => {
	switch (action.type) {
		case IS_LOADING_TYPE:
			return (state = action.payload);
		default:
			return state;
	}
};
