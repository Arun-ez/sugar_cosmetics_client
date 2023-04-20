
import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, SORT, FILTER } from "./action_types"
const BASE_URL = process.env.REACT_APP_SERVER_URL;

const handle_filter_options = (data) => {
    let options = {};

    data.forEach(({ filter }) => {
        if (filter !== "") {
            options[filter] = filter;
        }
    })

    let filters = [];

    Object.keys(options).forEach((key) => {
        filters.push({ name: key, checked: false });
    })

    return filters;

}

const load = async (dispatch, get_state) => {

    const { category } = dispatch(get_state).ProductReducer;

    try {
        let response = await fetch(`${BASE_URL}/products/${category}`);
        let data = await response.json();
        let filter_options = handle_filter_options(data.data);
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data.data });
        dispatch({ type: FILTER, payload: filter_options });
    } catch (error) {
        dispatch({ type: GET_PRODUCTS_FAILURE });
    }
}

const sort_and_filter_handler = async (dispatch, get_state) => {
    const { category, sortBy, sortOrder, filterBy } = dispatch(get_state).ProductReducer;

    let value = "";
    filterBy.forEach(({ name, checked }) => {

        if (checked) {
            value += `filter=${name}&`
        }
    })

    try {
        let response = await fetch(`${BASE_URL}/products/${category}?sort=${sortBy}&order=${sortOrder}&${value}`);
        let data = await response.json();
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data.data });

    } catch (error) {
        dispatch({ type: GET_PRODUCTS_FAILURE });
    }
}

const get = (dispatch, value) => {
    dispatch({ type: GET_PRODUCTS_REQUEST, payload: value });
    dispatch(load);
}

const sort = (dispatch, value) => {
    if (!value) {
        dispatch({ type: SORT, payload: { sort: "", order: "" } });
    } else {
        const [sort, order] = value.split("_");
        dispatch({ type: SORT, payload: { sort, order } });
    }

    dispatch(sort_and_filter_handler);
}

const filter = (dispatch, value) => {
    dispatch({ type: FILTER, payload: value });
    dispatch(sort_and_filter_handler);
}

export { get, sort, filter }