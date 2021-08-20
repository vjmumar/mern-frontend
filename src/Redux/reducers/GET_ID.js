import { GET_ID_TYPE } from "../types/type";

export const GET_USER_ID = (state = "", action) => {
	switch (action.type) {
		case GET_ID_TYPE:
			return (state = localStorage.getItem("myId"));
		default:
			return state;
	}
};
