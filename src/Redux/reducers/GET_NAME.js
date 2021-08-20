import { GET_NAME_TYPE } from "../types/type";

export const GET_NAME_REDUCER = (state = "", action) => {
	switch (action.type) {
        case GET_NAME_TYPE: 
        return state = localStorage.getItem("myName");
        default: return state
	}
};
