export const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return ({...state, 
                login : true, 
                email: action.payload.email, 
                user: action.payload.user,
                error: ''
            })
        case 'LOGOUT':
            return ({...state, 
                login : false, 
                email: '', 
                user: '',
                error: ''
            })
        case 'SET_ERROR':
            return ({...state, 
                error: action.payload
            })
        default:
            return state;
    }
}