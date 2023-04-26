import mongoose from "mongoose";

const stickerSchema = new mongoose.Schema({
    image:{
        url:String,
        public_id:String
    },
    category:{
        type:String
    },
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    }
})

export default mongoose.model("Stickers", stickerSchema);