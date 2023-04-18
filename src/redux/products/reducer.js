import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, SORT, FILTER } from "./action_types"

const initial = {
    data: [],
    category: "",
    sortBy: "",
    sortOrder: "",
    filterBy: [],
    isLoading: false,
    isError: false
}

const ProductReducer = (state = initial, action) => {
    switch (action.type) {

        case GET_PRODUCTS_REQUEST: {
            return {
                ...state,
                category: action.payload,
                isLoading: true,
                isError: false
            }
        }

        case GET_PRODUCTS_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError: false
            }
        }

        case GET_PRODUCTS_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }

        case SORT: {
            return {
                ...state,
                sortBy: action.payload.sort,
                sortOrder: action.payload.order
            }
        }

        case FILTER: {
            return {
                ...state,
                filterBy: action.payload
            }
        }

        default: {
            return state;
        }
    }
}

export { ProductReducer }