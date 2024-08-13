import jwt from 'jsonwebtoken';
const secret='test';
const auth=async (req,res,next)=>{

    try {
        
        const token=req.headers.authorization.split(" ")[1];
        const isCustomAuth=token.length < 500;

        let decodeDate;
        if(token && isCustomAuth){
            decodeDate=jwt.verify(token,secret);
            req.userId=decodeDate?.id;
        } else{
            decodeDate=jwt.decode(token);
            req.userId=decodeDate?.sub;
        }
        next();

    }  catch(err){
        console.log(err);
    }
}

export default auth