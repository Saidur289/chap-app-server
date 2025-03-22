import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
    {
        senderId: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    {
        receiverId:{
            types: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
        },
        images: {
            type: String
        }
    },
    {timestamps: true}

)
const Message = mongoose.model("Message", messageSchema)
export default Message