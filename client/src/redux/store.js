import {combineReducers, createStore} from 'redux'
import Reducers from './reducers/Reducers'
import {composeWithDevTools} from 'redux-devtools-extension'


const rootRudecers = combineReducers({
    userToken: Reducers,

})

const store = createStore(rootRudecers, composeWithDevTools())

export default store