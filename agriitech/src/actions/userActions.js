import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate()

import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

export const login = (email,password) =>


    async (dispatch) =>{
       
        
        try{
            dispatch({
                type: USER_LOGIN_REQUEST,
            })
            const config = {
                headers:{
                    'Content-Type': 'application/json'
                },
            }

    const { data } = await axios.post(
        'http://127.0.0.1:8080/login',
        { email, password },
        config
    )
    console.log(data)
    dispatch({
        type: USER_LOGIN_SUCCESS,
        payload : data
    })
    

    localStorage.setItem('userInfo',JSON.stringify(data))
    console.log(localStorage.getItem('userInfo'))
    
    
    
   
    }catch(error){
       dispatch({
        type:USER_LOGIN_FAIL,
        payload:
            error.response && error.response.data.message
            ?error.response.data.message:
            error.message
       })
    }

    }

export const register = (name,email,password,mobile) => async (dispatch)=>{
    console.log(name,email,password,mobile)
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            },
        }

        const { data } = await axios.post(
            'http://localhost:8080/register',
            { name, email, password, mobile },
            config
        )
        console.log(data)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

// export const getUserDetails = (id) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: USER_DETAILS_REQUEST,
//         })

//         const { userLogin: { userInfo } } = getState()

//         const config = {
//             headers: {
//                 'Content-type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             },
//         }

//         const { data } = await axios.get(
//             `/api/users/${id}`,
//             config
//         )

//         dispatch({
//             type: USER_DETAILS_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: USER_DETAILS_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                     ? error.response.data.message
//                     : error.message
//         })
//     }
// }
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    // dispatch({ type: USER_DETAILS_RESET })
    // dispatch({ type: ORDER_LIST_MY_RESET })
    // dispatch({ type: USER_LIST_RESET })
}