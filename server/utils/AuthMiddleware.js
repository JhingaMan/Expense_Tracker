import userModel from "../Models/userModel.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const userVerification = (req ,res ,next) =>{
    const token = req.cookies.token
    if(!token){
        return res.json({status : false})
    }
    jwt.verify(token, process.env.TOKEN_KEY , async (err , data) => {
        if(err)
            return res.json({status: false})
        else{
            const user = await userModel.findById(data.id)
            if(user) return res.json({status: true , user: user.username})
            else return res.json({status: false})
        }
    });
}

export default userVerification 
