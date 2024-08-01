import { Request,Response } from "express";
import User,{ IUser } from '../models/user';
import bcryptjs from 'bcryptjs'
import {ROLES} from '../helpers/constantValues'


//funcion para registrar al usuario
export const register = async (req:Request,res:Response) :Promise<void> =>{

    //===================================USER CREATION=========================================//
    //extraemos los datos que tienen que ser de tipo IUser del req.body
    const {name,email,password,role}:IUser = req.body;
    //creamos el usuario haciendo una instancia de User
    const user = new User ({name,email,password,role});
    
    //===================================ENCRYPT PASSWORD=========================================//

    //generamos el 'salt' que es un bloque aleatorio de texto genSaltSync("numero de veces que se hace el salt")
    const salt = bcryptjs.genSaltSync();
    //se almacena la contraseña aplicando un hash a la contraseña y al salt
    user.password = bcryptjs.hashSync(password,salt);

    //⚠️Bcrypt compara la contraseña toda rota con la original sin necesidad de hacer el proceso de desencriptación⚠️

    //===================================ROLE FOR USER=========================================//

    const adminKey = req.headers["admin-key"];

    if (adminKey === process.env.KEYFORADMIN){
       user.role=ROLES.ADMIN;
    }

   //===================================CODE TO SEND=========================================//

   //Creamos una funcion que genere un string aleatorio para mandarselo al usuario
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
    //le asignamos el string aleatorio a la propiedad code del user
    user.code = makeRandomString(6);

    //===================================SAVE TO DATABASE=========================================//

    await user.save();

    res.status(201).json({user});

}



