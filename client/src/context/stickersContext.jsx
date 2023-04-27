import { createContext, useState } from "react";
import { getAllProductsRequest, getProductsByCategoryRequest, uploadProductsRequest, addToCartRequest, getCartProductsIpRequest, deleteCartItemRequest, searchRequest } from "../api/stickersRequest";

const StickersContext = createContext();

export const StickersContextProvider = ({children}) => {

    const [ip, setIp] = useState();
    const [allProducts, setAllproducts] = useState([]);
    const [cart, setCart] = useState([]);

    const getIpContext = async () => {
           await fetch("https://api64.ipify.org?format=json")
            .then((res) => res.json())
            .then((res) => {
                setIp(res.ip);
                getCartProductsIpContext(res.ip);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const getAllProductsContext = async () => {
        const res = await getAllProductsRequest();
        setAllproducts(res.data);
    }

    const getProductsByCategoryContext = async (category) => {
        const res = await getProductsByCategoryRequest(category);
        setAllproducts(res.data);
    }

    const uploadProductsContext = async (stickerObject) => {
        const res = await uploadProductsRequest(stickerObject);
        setAllproducts([...allProducts, res.data]);
    }

    const getCartProductsIpContext = async (ip) => {
        const res = await getCartProductsIpRequest(ip);
        setCart(res.data[0].productsBuyed);
    }

    const addToCartContext = async (addToCartObject) => {
        const res = await addToCartRequest(addToCartObject);
        setCart(res.data[0].productsBuyed);
    }

    const deleteCartItemContext = async (ip, id) => { //ultimo hecho
        const res = await deleteCartItemRequest(ip, id);
        if(res.status === 204){
            setCart(cart.filter((c) => c._id !== id));
        }
    }

    const searchContext = async (search) => {
        const res = await searchRequest(search);
        setAllproducts(res.data);
    }

    return(
        <StickersContext.Provider value={{getIpContext, 
        ip, 
        uploadProductsContext, 
        getAllProductsContext, 
        getProductsByCategoryContext,
        allProducts, 
        addToCartContext,
        getCartProductsIpContext,
        deleteCartItemContext,
        searchContext, 
        cart}}>{children}</StickersContext.Provider>
    )
}

export default StickersContext;