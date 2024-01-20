import  axios from 'axios';

import {
    SUPPLIER_PRODUCT_CREATE_REQUEST,
    SUPPLIER_PRODUCT_CREATE_FAIL,
    SUPPLIER_PRODUCT_CREATE_SUCCESS
} from '../constants/supplierConstant';

import {logout} from './userActions'

export const createSupplierProduct = ({
    name,
    email,
    address,
    cropSelection,
    storage,
    image,
    phonenumber,
    description
}) => async (dispatch,getState) =>{
    try{
        dispatch({
            type: SUPPLIER_PRODUCT_CREATE_REQUEST,
        })
        const {userLogin :{userInfo}} = getState();
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            '/api/supplier',
            {
                name,
                email,
                address,
                cropSelection,
                storage,
                image,
                phonenumber,
                description  
            },
            config
        )
        dispatch({
            type: SUPPLIER_PRODUCT_CREATE_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:SUPPLIER_PRODUCT_CREATE_FAIL,
            payload:error.response && error.response.data.message ?
                    error.response.data.message :
                    error.message


        })
    }
}