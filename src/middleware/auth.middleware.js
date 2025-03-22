import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
export const protectRoute = async(req, resizeBy, next) => {
    try {
        const token = req.cookie.jwt
        if(!token){
            return res.status(401).json({message: 'Unauthorized NO token provided'})
        }
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(!decode) {
            return res.status(401).json({message: 'Unauthorized Invalid token provided'})
        }
        const user = await User.findById(decode.userId).select("-password")
        if(!user){
            return res.status(401).json({message: 'Unauthorized NO token provided'})
        }
        res.user = user 
        next()
    } catch (error) {
      console.log('Error in protect Route', error.message);  
      res.status(401).json({message: 'Unauthorized NO token provided'})
    }
}