import { GET_COMMENTS_TYPE } from "../types/type";

export const GET_COMMENTS_ACTION = (payload) => {
    return{
        type: GET_COMMENTS_TYPE,
        payload: payload
    }
}