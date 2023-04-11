
const initial = {
    isAuth: false,
    token: null,
    isLoading: false,
    isError: false
}

const AuthReducer = (state = initial, action) => {
    switch (action.type) {

        default: {
            return state;
        }
    }
}

export { AuthReducer }