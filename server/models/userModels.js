import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    ip:{
        type:String,
        require:true
    },
    productsBuyed: [
        {
            image:{
                type:String
            },
            name:{
                type: String,
                require:true
            },
            price:{
                type:Number
            },
            quantity:{
                type: Number
            },
            total:{
                type:Number
            }
        }
    ]
})

export default mongoose.model("UserBuy", userSchema);