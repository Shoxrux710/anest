import {USER_TOKEN, LANG_THREE} from '../action/Types'
import cookie from 'js-cookie'


const initilLang = cookie.get('i18next') || 'uz'
const authData = JSON.parse(window.localStorage.getItem('auth'))
const initilToken = authData ? !!authData.token : null
const initilAuth = authData ? authData.token : false

const initilState = {
    token: initilToken,
    auth: initilAuth,
    lang: initilLang
}

const Reducers = (state = initilState, action) => {

    switch (action.type) {
        case USER_TOKEN:
            const auth = action.payload.token ? true : false

            return {
                ...state,
                auth: auth,
                token: action.payload.token
            }
        case LANG_THREE: 

        return {
            ...state,
            lang: action.payload
        }

        default:
            return state
    }
}

export default Reducers