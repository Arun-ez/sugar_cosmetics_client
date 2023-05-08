
import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, SET_STATUS_LIST, SET_WISH_LIST, SORT, FILTER } from "./action_types"
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

const get_wishlist_status = async (data, token) => {
    try {
        let response = await fetch(`${BASE_URL}/wishlist`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${token}`
            }
        });

        let wishlist = await response.json();

        let status_list = data.data.map((elm) => {
            let track = wishlist.data.find((item) => {
                return elm._id === item._id;
            })

            if (track) {
                return true;
            } else {
                return false;
            }
        })

        return status_list;

    } catch (error) {
        console.log(error)
    }
}

const get_wishlist = async (dispatch, get_state) => {
    const { token } = dispatch(get_state).AuthReducer;

    try {
        let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/wishlist`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${token}`
            }
        });
        let base = await response.json();
        dispatch({ type: SET_WISH_LIST, payload: base.data })
    } catch (err) {
        console.log(err);
    }
}

const load = async (dispatch, get_state) => {

    const { category } = dispatch(get_state).ProductReducer;
    const { token } = dispatch(get_state).AuthReducer;

    try {
        let response = await fetch(`${BASE_URL}/products/${category}`);
        let data = await response.json();
        let filter_options = handle_filter_options(data.data);
        if (token) {
            let status = await get_wishlist_status(data, token);
            dispatch({ type: SET_STATUS_LIST, payload: status });
        }

        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data.data });
        dispatch({ type: FILTER, payload: filter_options });
    } catch (error) {
        dispatch({ type: GET_PRODUCTS_FAILURE });
    }
}

const sort_and_filter_handler = async (dispatch, get_state) => {
    const { category, sortBy, sortOrder, filterBy } = dispatch(get_state).ProductReducer;
    const { token } = dispatch(get_state).AuthReducer;

    let value = "";
    filterBy.forEach(({ name, checked }) => {

        if (checked) {
            value += `filter=${name}&`
        }
    })

    try {
        let response = await fetch(`${BASE_URL}/products/${category}?sort=${sortBy}&order=${sortOrder}&${value}`);
        let data = await response.json();
        if (token) {
            let status = await get_wishlist_status(data, token);
            dispatch({ type: SET_STATUS_LIST, payload: status });
        }
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

export { get, sort, filter, sort_and_filter_handler, get_wishlist, get_wishlist_status }