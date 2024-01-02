import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk} from 'redux-thunk'

import {
    userLoginReducer,
    userRegisterReducer,
} from './reducers/userReducer'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const intialState = {
    userLogin:{
        userInfo: userInfoFromStorage
    }
}
const middleware = [thunk];

const store = createStore(
    reducer,
    intialState,
    applyMiddleware(...middleware)
)

export default store