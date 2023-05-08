import './products.css';
import { useContext, useEffect, useState } from 'react';
import StickersContext from '../../context/stickersContext';

const Products = () => {

    const {getAllProductsContext, allProducts, addToCartContext, ip} = useContext(StickersContext);
    const [addCartLayout, setAddCartLayout] = useState(false);
    const [cartItem, setCartItem] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        (async () => {
            await getAllProductsContext();
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const rest = (e) => {
        e.preventDefault();
        if(quantity > 1){
            setQuantity(quantity - 1);
        }else{
            setQuantity(1);
        }
    }

    const sum = (e) => {
        e.preventDefault();
        if(quantity < 10){
            setQuantity(quantity + 1);
        }else{
            setQuantity(10);
        }
    }

    const AddToCartLayout = () => {

       const add = async (e, cartItem) => {
        e.preventDefault();

        const total = cartItem.price * quantity;
        
        const addToCartObject = {
            ip: ip,
            id: cartItem.id,
            image: cartItem.image,
            name: cartItem.name,
            price: cartItem.price,
            quantity: quantity,
            total: total
        }
        setQuantity(1);
        await addToCartContext(addToCartObject);
        setAddCartLayout(false);
       }

        return(
            <div className='cartItem'>
            <form onSubmit={(e) => add(e, cartItem)}>
                <div>
                    <p>{cartItem.name}</p>
                </div>
                <div>
                    <img loading='lazy' src={cartItem.image} alt=""></img>
                </div>
                <div>
                    <p>Price: ${cartItem.price}</p>
                </div>
                <div className='quantity'>
                    <button onClick={(e) => rest(e)}>-</button><label>{quantity}</label><button onClick={(e) => sum(e)}>+</button>
                </div>
                <div className='buyCancel'>
                    <button onClick={() => setAddCartLayout(!addCartLayout)}>Cancel</button>
                    <button type="submit">Buy sticker</button>
                </div>
            </form>
            </div>
        )
    }

    const openCartLayout = async (id, image, name, price) => {
        setCartItem({id, image, name, price});
        setAddCartLayout(true);
    }

    return(
        <div className='products'>
            <div className='products-container'>
                {allProducts.map((p) => <div key={p._id} className='stickers'><img loading='lazy' src={p.image.url} alt=""></img><button onClick={() => openCartLayout(p._id, p.image.url, p.name, p.price)}>+</button></div>)}
            </div>
            {addCartLayout ? <AddToCartLayout/> : ''}
        </div>
    )
}

export default Products;
