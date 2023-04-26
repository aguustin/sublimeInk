import Stickers from "../models/stickersModels.js";
import UserBuy from "../models/userModels.js";
import { uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const uploadProductsController = async (req, res) => { //subida de productos por parte del administrador

    const {category, name, description, price} = req.body;

    let image;
    
    if(req.files){
        const result = await uploadImage(req.files.image.tempFilePath);
        await fs.remove(req.files.image.tempFilePath);
        image = {
            url: result.secure_url,
            public_id: result.public_id
        }
    }
    const resultUpload = await new Stickers({image, category, name, description, price});
    await resultUpload.save();
    return res.json(resultUpload); 
    

}

export const findUserController = async (req, res) => { //encontrar todos los usuarios (todavia no funciona)
    const allUsers = await UserBuy.find({});
    res.send(allUsers);
}

export const getAllProductsController = async (req, res) => { //obtener todos los productos en la pagina principal
    const allProducts = await Stickers.find({});
    res.send(allProducts);
}

export const getProductsByCategoryController = async (req, res) => { //obtener los productos por categoria
    const category = req.params.category;
    const productsByCategory = await Stickers.find({category: category});
    res.send(productsByCategory);
}

export const getProductsBySearch = async (req, res) => { //obtener los productos por buscador
    const name = req.body.name;
    console.log(name);
    const productsBySearch = await Stickers.find({name:{'$regex' : name, '$options' : 'i'}});
    res.send(productsBySearch);
}

export const addToCartController = async (req, res) => {  /**añadir info del producto dentro de otro modelo que tenga como caracteristica principal la ip del modelo de usuario para ser buscado mediante esta */
    const {ip, image, name, price, quantity, total} = req.body;
    
    if(req.body.name){
        const ipExist = await UserBuy.find({ip: ip});
   
        if(ipExist.length !== 0){  //si la ip existe entonces se actualiza añadiendole otro producto mas
        await UserBuy.updateOne(
                {ip: ip},
                {
                $addToSet:{
                    productsBuyed: {
                        image: image,
                        name: name,
                        price: price,
                        quantity: quantity,
                        total: total
                    }
                }
                }
            )

            const updateCart = await UserBuy.find({ip: ip});

            res.send(updateCart);
        }else{

            console.log("no existe, creando usuario: ");  //si la ip no existe entonces se crea una nueva ip de compra junto con el primer producto comprado
            const saveUserBuy = await new UserBuy({
                ip: ip,
                productsBuyed: [
                    {
                        image: image,
                        name: name,
                        price: price,
                        quantity: quantity,
                        total: total
                    }
                ]
            });
            await saveUserBuy.save();

            res.send(saveUserBuy);
        }
    }else{
        console.log(ip);
        const a = await UserBuy.find({ip: ip});
        res.send(a);
    }
    
}

export const getCartProductsIpController = async (req, res) => {
    const {ip} = req.params;
    const response = await UserBuy.find({ip: ip});
    res.send(response);
}

export const deleteCartItemController = async (req, res) => { //ultimo hecho
    const {ip, id} = req.params;
    console.log(ip, " ", id);
    await UserBuy.updateOne(
        {ip: ip},
        {$pull: {productsBuyed: {_id : id}}});
    res.sendStatus(204);
}
/*
.updateOne({ "datas": {
    "$elemMatch": {
      "id": ObjectId("6350ce45605a1c2f35e4c607"),
      "report.activityId": ObjectId("6350f1313f586971dfd1effd")
    }
  }},{$pull : { "datas.$.report" : { activityId:  ObjectId("6350f13aaa8f2d84071fc3cd")} }})*/

export const deleteAllProductsController = async (req, res) => {
    await Stickers.deleteMany();
    res.sendStatus(200);
}

export const deleteProductController = async (req, res) => { //el administrador borra un producto
    const id = req.params.id;
    await Stickers.deleteOne({_id: id});
    res.sendStatus(200);
}
