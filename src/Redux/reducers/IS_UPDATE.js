import { IS_UPDATE_TYPE } from "../types/type";

export const IS_UPDATE_REDUCER = (state = false, action) => {
	switch (action.type) {
		case IS_UPDATE_TYPE:
			return (state = action.payload);
		default:
			return state;
	}
};
