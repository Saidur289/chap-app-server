import Message from "../models/message.model.js";
import User from "../models/user.model.js";


export const getUsersForSidebar =async(req, res) => {
    try {
        const loggedUserId = req.user?._id 
        const filteredUsers = await User.find({_id: {$ne: loggedUserId}}).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log('Error in getUsersForSidebar', error.message);
        res.status(500).json({message: 'Server Error'})
        
    }
}
export const getMessages = async(req, res) => {
    try{
        const {id: userToChatId} = req.params
        console.log(req.user);
        const myId = req.user._id
        const messages = await Message.find({
            $or: [
              {senderId: myId, receiverId: userToChatId},
              {senderId: userToChatId, receiverId: myId}
            ]
        })
        res.status(200).json(messages)
    }
    catch(error){
        console.log('error cought in get Messages function', error);
        res.status(500).json('Server Error')
    }
}