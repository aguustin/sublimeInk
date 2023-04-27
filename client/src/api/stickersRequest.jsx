import axios from "axios";

export const uploadProductsRequest = async (stickerObject) => {

    const form = new FormData();

    for(let key in stickerObject){
    
    form.append(key, stickerObject[key]);

    }
    return await axios.post('/uploadProduct', form , {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export const getAllProductsRequest = () => axios.get('/all');

export const getProductsByCategoryRequest = (category) => axios.get(`/category/${category}`);

export const addToCartRequest = (addToCartObject, ip) => axios.post('/addToCart', addToCartObject);

export const getCartProductsIpRequest = (ip) => axios.get(`/getC/${ip}`);

export const deleteCartItemRequest = (ip, id) => axios.put(`/deleteItem/${ip}/${id}`);

export const searchRequest = (search) => axios.post('/search', {search});