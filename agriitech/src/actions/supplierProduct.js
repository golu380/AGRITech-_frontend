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
    description,
    imgUrl,
    id
}) => async (dispatch,getState) =>{
    try{
        dispatch({
            type: SUPPLIER_PRODUCT_CREATE_REQUEST,
        })
        const {userLogin :{userInfo}} = getState();
            console.log(userInfo);
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.data.access_token}`
            }
        }

        const {data} = await axios.post(
            'http://localhost:8080/api/supplier',
            {
                name,
                email,
                address,
                cropSelection,
                storage,
                image,
                phonenumber,
                description ,
                imgUrl ,
                id
                
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