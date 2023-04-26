import { createContext, useState } from "react";
import { getAllProductsRequest, getProductsByCategoryRequest, uploadProductsRequest, addToCartRequest, getCartProductsIpRequest, deleteCartItemRequest } from "../api/stickersRequest";

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
    console.log("i:", ip);
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
        console.log(res.data[0].productsBuyed);
        setCart(res.data[0].productsBuyed);
    }

    const addToCartContext = async (addToCartObject) => {
        const res = await addToCartRequest(addToCartObject);
        setCart(res.data[0].productsBuyed);
    }

    const deleteCartItemContext = async (ip, id) => { //ultimo hecho
        const res = await deleteCartItemRequest(ip, id);
        console.log("cart: ", cart);
        if(res.status === 204){
            setCart(cart.filter((c) => c._id !== id));
        }
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
        cart}}>{children}</StickersContext.Provider>
    )
}

export default StickersContext;