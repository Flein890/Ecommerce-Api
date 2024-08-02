import jwt from 'jsonwebtoken'

const generateJWT = async (id:string):Promise<string> =>{

return new Promise((res,rej)=>{
    const payload={id};

    jwt.sign(payload,
            process.env.SECRETKEY as string,
            {expiresIn:"1hr"},
            (err:Error | null, token:string | undefined) =>{
                if (err){
                    console.error(err);
                    rej("Can't generate token")
                }
                else{
                    res(token as string)
                }
            })
  })
  
}

export default generateJWT;