import {USER_TOKEN, LANG_THREE} from './Types'

export const userToken = (items) => {
    
    window.localStorage.setItem('auth', JSON.stringify(items))

    return {
        type: USER_TOKEN,
        payload: items
    }
}


export const userLang = (langs) => {

    return {
        type: LANG_THREE,
        payload: langs
    }
}