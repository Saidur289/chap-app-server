import { generateToken } from "../lib/utilis.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
export const signup = async(req, res) =>{
    const {fullName, email, password} = req?.body
   try{
    if(!fullName || !email || !password) return res.status(403).json({message: 'Every Field Required '})
    // hash password
   if(password.length < 6){
    return res.status(403).json({message: 'Password must be at least 6 character'})
   }
   const user = await User.findOne({email})
   if(user) return res.status(401).json({message: 'Email already exists'})
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
        fullName,
        email,
        password: hashedPassword
    })
    if(newUser) {
        // generate token
        generateToken(newUser._id, res)
        res.status(201).json({
          _id: newUser._id,
          email: newUser.fullName,
          profilePic: newUser.profilePic  
        })
    }
    else{
        res.status(400).json({message: 'Invalid user data'})
        res.status(500).json({message: 'Internal server error'})
    }
   }
   catch(error){
    console.log(error, 'error in the singup controller');
   }
}
export const login = (req, res) => {
    res.send('login route');
}
export const logout = (req, res) => {
    res.send('logout route');
}