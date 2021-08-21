import { GET_COMMENTS_TYPE } from "../types/type";

export const GET_COMMENTS_REDUCER = (state = [], action) => {
	switch (action.type) {
		case GET_COMMENTS_TYPE:
			return (state = action.payload);
		default:
			return state;
	}
};
