import mongoose from "mongoose";

const stickersSchema = new mongoose.Schema({
    image:{
        url: String,
        public_id: String
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
});

export default mongoose.model("stickers", stickersSchema);