import { IS_LOADING_TYPE } from "../types/type";

export const IS_LOADING_ACTION = (payload) => {
return{
    type: IS_LOADING_TYPE,
    payload: payload
}
}