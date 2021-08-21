import { IS_UPDATE_TYPE } from "../types/type";

export const IS_UPDATE_ACTION = (payload) => {
	return {
		type: IS_UPDATE_TYPE,
		payload: payload,
	};
};
