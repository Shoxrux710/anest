import {USER_TO_PROFILE, LOGOUT} from '../action/Types'
const authData = JSON.parse(window.localStorage.getItem('auth'))
const initilAuth = authData ? !!authData.token : false
const initilId = authData ? authData.user.id : null;
const initialToken = authData ? authData.token : null;
const initilRole = authData ? authData.user.role : null


const initilState = {
   auth: initilAuth, 
   userId: initilId, 
   role: initilRole,
   token: initialToken
}

const userReducers = (state = initilState, action) => {

    switch (action.type) {
        case USER_TO_PROFILE:

        const auth = action.payload.token ? true : false

        return {
            ...state,
            auth: auth,
            token: action.payload.token,
            userId: action.payload.user.id,
            role: action.payload.user.role
        }

        case LOGOUT: 

        return {
            ...state,
            auth: false, 
            userId: null, 
            role: null,
            token: null
        }
 
        default:
            return state
    }
}

export default userReducers
