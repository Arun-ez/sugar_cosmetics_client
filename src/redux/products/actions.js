
import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, SORT, FILTER } from "./action_types"
const BASE_URL = process.env.REACT_APP_SERVER_URL;

const load = async (dispatch, get_state) => {

    dispatch({ type: GET_PRODUCTS_REQUEST });

    const { category, sortBy, sortOrder, filterBy } = dispatch(get_state).ProductReducer;

    let value = "";
    filterBy.forEach((elm) => {
        value += `type=${elm}&`
    })

    try {
        let response = await fetch(`${BASE_URL}/${category}?sort=${sortBy}&order=${sortOrder}&${value}`);
        let data = await response.json();
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: GET_PRODUCTS_FAILURE });
    }
}

const sort = (value) => {
    dispatch({ type: SORT, payload: value });
    dispatch(load);
}

const filter = (value) => {
    dispatch({ type: FILTER, payload: value });
    dispatch(load);
}

export { load, sort, filter }