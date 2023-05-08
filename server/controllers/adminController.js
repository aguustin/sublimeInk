import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";

export const saveAdminController = async (req, res) => {

    const {username, password, repitePassword} = req.body;

    if(password === repitePassword){

        const salt = bcrypt.genSaltSync(13);
        const passHash = await bcrypt.hash(password, salt);

        const saveAdmin = new Admin({
            username: username,
            password: passHash
        });
        const response = await saveAdmin.save();
        res.send(response);

    }else{
        console.log("Las contrasenas no coinciden");
        res.sendStatus(404);
    }
}

export const authAdminController = async (req, res) => {

    const {username, password, repitePassword} = req.body;

    if(password === repitePassword){
        const searchUser = await Admin.find({username : username});

        if(searchUser.length >= 1){
            const getUserPassword = searchUser[0].password;
            
            let isMatch = await bcrypt.compareSync(password, getUserPassword);

            if(isMatch){
                res.send(searchUser);
            }else{
                console.log("la contraseña no existe");
                res.sendStatus(401);
            }

        }else{
            console.log("el usuario no existe");
            res.sendStatus(404);
        }

    }else{
        console.log("las contrasenas no coinciden");
        res.sendStatus(400);
    }
}

export const deleteAllAdminsController = async (req, res) => {
    await Admin.deleteMany();
    res.sendStatus(200);
}