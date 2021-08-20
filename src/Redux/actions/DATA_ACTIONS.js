import { FILTER_DATA_TYPE } from "../types/type"

export const FILTER_DATA = (payload) => {
return {
    type: FILTER_DATA_TYPE,
    payload: payload
}
}