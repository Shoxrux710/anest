import {USER_TO_PROFILE, LOGOUT} from './Types'

export const userProfile = (items) => {
    
    window.localStorage.setItem('auth', JSON.stringify(items))

    return {
        type: USER_TO_PROFILE,
        payload: items
    }
}

export const logOut = () => {

    window.localStorage.removeItem('auth')

    return {
        type: LOGOUT,
    }
}