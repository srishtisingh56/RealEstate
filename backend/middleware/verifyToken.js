 import jwt from 'jsonwebtoken'

 export const verifyToken = (req,res,next) =>
 {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message:"Not authenticated!"})
    
    jwt.verify(token,process.env.JWT_SECRET_KEY,async(err,userInfo)=>
    {
        if(err) return res.status(403).json({message:"Token is not valid!"})
        req.userId = userInfo.id;
        //go to next function
        next();
    });
 }
 