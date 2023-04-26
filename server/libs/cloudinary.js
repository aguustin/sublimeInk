import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name: "drmcrdf4r",
    api_key: "521116467426574",
    api_secret: "IyZYzTmTrxIpuEHp04kZ6lWk40g"
  });
  

export const uploadImage = async filePath => {  /**funcion para subir imagen. filePath es el nombre de la ruta del archivo */
    return await cloudinary.uploader.upload(filePath, {  //funcion de cloudinary para subir el archivo
        folder: 'stickers' //nombre de la carpeta de cloudinary en donde se guardara el archivo
    });
}