import {jwt} from "jsonwebtoken"

const getToken = async (userId) => {
   try{
     const token = jwt.signin({userId} , process.env.JWT_SECRET , {expireIn: "7d"});
        return token
   }catch(error){
    console.log)(error)
   }
}
export default getToken()