import { Request,Response } from "express";
import User,{ IUser } from '../models/user';
import bcryptjs from 'bcryptjs'
import {ROLES} from '../helpers/constantValues'
//--------Email---------//
import { sendEmail } from "../nodeMailer/mailer";
//--------JWT---------//
import generateJWT from "../helpers/generateJWT";


// Creamos una funcion que genere un string aleatorio para mandarselo al usuario
    const makeRandomString = (length:number) =>{
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
    
        let result = '';
        let counter = 0;
    
        while(counter<length){
            result+= characters.charAt(Math.floor(Math.random() * charactersLength));
            counter++;
        }
        return result;
      }

//----------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------REGISTER--------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------------------//

export const register = async (req:Request,res:Response):Promise<void> =>{
    //===================================USER CREATION=========================================//
    //extraemos los datos que tienen que ser de tipo IUser del req.body
    const {name,email,password,role}:IUser = req.body;
    //creamos el usuario haciendo una instancia de User
    const user = new User ({name,email,password,role});
    
    //=================================== ENCRYPT PASSWORD =========================================//

    //generamos el 'salt' que es un bloque aleatorio de texto genSaltSync("numero de veces que se hace el salt")
    const salt = bcryptjs.genSaltSync();
    //se almacena la contraseña aplicando un hash a la contraseña y al salt
    user.password = bcryptjs.hashSync(password,salt);

    //⚠️Bcrypt compara la contraseña toda rota con la original sin necesidad de hacer el proceso de desencriptación⚠️

    //=================================== ROLE FOR USER =========================================//

    const adminKey = req.headers["admin-key"];

    if (adminKey === process.env.KEYFORADMIN){
       user.role=ROLES.ADMIN;
    }
    // else{
    //     user.role=ROLES.USER
    // }

   //=================================== CODE TO SEND =========================================//


    //le asignamos el string aleatorio a la propiedad code del user

    let codeToSend = makeRandomString(6);
    user.code = codeToSend

    //=================================== SAVE TO DATABASE =========================================//

    await user.save();

    //=================================== SEND CODE TO EMAIl =========================================//
    await sendEmail(email,codeToSend)

   res.status(201).json({msg:"saved",user})
   console.log('usuario registrado')
}

//----------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------LOGIN------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------------------//

export const login = async(req:Request,res:Response):Promise<void> =>{
   const {email,password}:IUser = req.body;
   try {
      //Buscamos si el email exister en la db
      const user = await User.findOne({email});

      if(!user){
         res.status(400).json({msg:"User not found"})
         return;
      }
      
      //=========================== PASS COMPARISON ==================================//
      const matchesPasswords:boolean = bcryptjs.compareSync(password,user.password);
       
      if(!matchesPasswords){
             res.status(400).json({msg:"Password is incorrect"});
             return;
      }
    
       //============================== JWT =======================================//
       
      const token = await generateJWT(user.id);

      res.json({user,token})
 
   } catch (error) {
      console.error(error);
      res.status(500).json({msg:"Internal Server Error"})
   }
}