import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, SET_STATUS_LIST, SET_WISH_LIST, SORT, FILTER } from "./action_types"

const initial = {
    data: [],
    category: "",
    statuslist: [],
    sortBy: "",
    sortOrder: "",
    filterBy: [],
    wishlist: [],
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

        case SET_STATUS_LIST: {
            return {
                ...state,
                statuslist: action.payload
            }
        }

        case SET_WISH_LIST: {
            return {
                ...state,
                wishlist: action.payload
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