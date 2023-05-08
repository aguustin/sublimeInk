import './navigation.css';
import cartImg from "../../imgs/cart.png";
import fondo_sticker from "../../imgs/fondo_stickers.jpg";
import pintura from "../../imgs/salpicadura-de-pintura.png";
import burguerBar from "../../imgs/burgerBar.png";
import search from "../../imgs/search.png";
import trash from "../../imgs/trash.png";
import { useContext, useEffect, useState } from 'react';
import AdminContext from '../../context/adminContext';
import StickersContext from '../../context/stickersContext';

const Navigation = () => {
    const {admin, setAdmin} = useContext(AdminContext);
    const {ip, getIpContext,
         uploadProductsContext, 
         getAllProductsContext,
         getProductsByCategoryContext,
         getCartProductsIpContext,
         deleteCartItemContext,
         deleteAllCartContext,
         searchContext, 
         cart} = useContext(StickersContext);
    const [cartLayout, setCartLayout] = useState(false);

    useEffect(() => {
            setAdmin(JSON.parse(localStorage.getItem("admin")));
            (async () => {
                await getIpContext();
                await getCartProductsIpContext(ip);
            })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const sendRequest = (e) => {
        e.preventDefault();
    }

    const signOut = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.reload();
    }

    const deleteCartItem = async (e, id) => { //ultimo hecho
        e.preventDefault();
        await deleteCartItemContext(ip, id);
    }
    
    const CartLayout = () => {

        const buyAll = async (e) => {
            e.preventDefault();
            await deleteAllCartContext(ip);
            
        }

        if(cart){
            const result = cart.reduce((sum, c) => sum += c.total, 0);

            return(
                <div className='cartItems'>
                    {cart.map((c) => <li key={c._id}>
                        <div>
                        <button className='deleteC' onClick={(e) => deleteCartItem(e, c._id)}><img src={trash} alt=""></img></button>
                            <img src={c.image} alt=""></img>
                        </div>
                        <div className="descItems">
                            <p>{c.name}</p>
                            <p>Price:${c.price}</p>
                            <p>Unities x {c.quantity}</p>
                            <p>total: {c.total}</p>
                        </div>   
                    </li>)}
                    <button className='buyAll' onClick={(e) => buyAll(e)}>Total: ${result}</button>      
                </div>
            )
        }

    }

    const SideNav = () => {
        return(
            <div>
                <form  onSubmit={(e) => sendRequest(e)} encType="multipart/form-data">
                    <div className='form-group'>
                        <input className='form-input' name="name" placeholder=" "></input>
                        <label className='form-label'>Nombre Completo</label>
                    </div>
                    <div className='form-group'>
                        <input className='form-input' name="phone" placeholder=" "></input>
                        <label className='form-label'>Telefono</label>
                    </div>
                    <div className='form-group'>
                        <textarea className='form-textarea' name="descripcionPedido" placeholder=" "></textarea>
                        <label className='form-label'>Descripcion del pedido</label>
                    </div>
                    <div className='form-group'>
                        <input className='form-input' type="file" name="imagenPedido" placeholder=" "></input>
                        <label className='form-label'>Imagen - opcional -</label>
                    </div>
                    <div>
                        <button className='sendOrder' type="submit">Enviar pedido</button>
                    </div>
                </form>
            </div>
        )
    }

    const uploadSticker = async (e) => {
       e.preventDefault();

        const stickerObject = {
            image: e.target.elements.image.files[0],
            category: e.target.elements.category.value,
            name: e.target.elements.name.value,
            description: e.target.elements.description.value,
            price: e.target.elements.price.value
        }

        await uploadProductsContext(stickerObject);
    }
    
    const AdminSideNav = () => {
        return(
            <div>
            <form  onSubmit={(e) => uploadSticker(e)} encType="multipart/form-data">
                <div className='form-group'>
                    <input className='form-input' type="file" name="image" accept='image/*' placeholder=" "></input>
                    <label className='form-label'>Imagen - opcional -</label>
                </div>
                <div className='form-group'>
                    <select className='form-input-select' name="category" placeholder=" ">
                        <option defaultValue="Animals">Animals</option>
                        <option value="Robots">Robots</option>
                        <option value="Games">Games</option>
                        <option value="Cartoon">Cartoon</option>
                        <option value="Heroes">Heroes</option>
                    </select>
                    <label className='form-label'>Categoria</label>
                </div>
                <div className='form-group'>
                    <input className='form-input' name="name" placeholder=" "></input>
                    <label className='form-label'>Nombre del Sticker</label>
                </div>
                <div className='form-group'>
                    <textarea className='form-textarea' name="description" placeholder=" "></textarea>
                    <label className='form-label'>Descripcion del sticker</label>
                </div>
                <div className='form-group'>
                    <input className='form-input' type="number" name="price" placeholder=" "></input>
                    <label className='form-label'>Precio</label>
                </div>
                <div>
                    <button className='sendOrder' type="submit">Subir Sticker</button>
                </div>
                <div>
                    <button className='signout' onClick={(e) => signOut(e)}>Cerrar session</button>
                </div>
            </form>
        </div>
        )
    }

    const TypeOfSide = admin ? AdminSideNav : SideNav;

    const getProducts = async (e, category) => {
        e.preventDefault();
        if(category){
            await getProductsByCategoryContext(category)
        }else{
            await getAllProductsContext();
        }
    }

    const searchProduct = async (e) => {
        e.preventDefault();
        const search = e.target.elements.search.value;
        await searchContext(search);
    }

    return(
        <div>
            <input className='openSideNav' id='openSideNav' type="checkbox"></input>
            <label className="a" for="openSideNav"><img src={burguerBar} alt=""></img></label>
            <div className='sideNav'><TypeOfSide/></div>
            <nav className='nav'>
                <img className='fondo-nav' src={fondo_sticker} alt=""></img>
                <img className='paint' src={pintura} alt=""></img>
                <input id="openSearch" type="checkbox"></input>
                <label className='searchLabel' for="openSearch"><img src={search} alt=""></img></label>
                <form className='formSearch' onSubmit={(e) => searchProduct(e)}>
                    <input name="search" placeholder="Search"></input>
                </form>
                <button className='cartB' onClick={() => setCartLayout(!cartLayout)}><img className='cart' src={cartImg} alt=""></img></button>
                {cartLayout ? <CartLayout/> : ''}
                <div className='categoryList'>
                    <ul>
                        <li className='allList'><button onClick={(e) => getProducts(e)}><span></span><label>All</label></button></li>
                        <li><button onClick={(e) => getProducts(e, "Animals")}><span></span><label>Animals</label></button></li>
                        <li><button onClick={(e) => getProducts(e, "Robots")}><span></span><label>Robots</label></button></li>
                        <li><button onClick={(e) => getProducts(e, "Games")}><span></span><label>Games</label></button></li>
                        <li><button onClick={(e) => getProducts(e, "Cartoon")}><span></span><label>Cartoon</label></button></li>
                        <li><button onClick={(e) => getProducts(e, "Heroes")}><span></span><label>Heroes</label></button></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navigation;