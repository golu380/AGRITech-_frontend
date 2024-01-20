import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk} from 'redux-thunk'

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
} from './reducers/userReducer'

import { productCreateReducer } from './reducers/supplierReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,

    productCreate: productCreateReducer
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