
import jwt from 'jsonwebtoken'
import 'dotenv/config'


function checkAuth(req,res,next){
if(req.headers.authorization){
    //Lấy token trong headers
    // console.log(req.headers.authorization);
    const token =  req.headers.authorization.split(' ')[1]
    // console.log(token);

    if(token){
        jwt.verify(token,process.env.KEY_SECRET,function(err,decode){
            if(err){
                //Kiểm tra token đúng hay sai
                if(err.name ==="JsonWebTokenError"){
                    return res.json({message:"Sai token"})
                }
                else if(err.name ==="TokenExpiredError"){
                    return res.json({message:"Token hết hạn"})
                }




            }

            next();

            





        })
    }
   
}else{
    res.json({message:"Thiếu token"})
}
}
export default checkAuth