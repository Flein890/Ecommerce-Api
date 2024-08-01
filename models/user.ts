import {Model, Schema, model} from "mongoose";
import { ROLES } from "../helpers/constantValues";

//Creamos la interfaz de cada usuario

export interface IUser{
    name:string;
    email:string;
    password:string;
    role?:string;
    code?:string;
    verified?:boolean;
}

//Hacemos un esquema instanciando a Schema y tiene que ser del tipo de la interfaz IUser

const UserSchema = new Schema <IUser>({
    name:{
        type:String,
        required:[true,"The name is required"]
    },
    email:{
        type:String,
        required:[true, "Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    role:{
        type:String,
        default:ROLES.USER
    },
    code:{
        type:String,
    },
    verified:{
        type:Boolean,
        default:false
    }
})


//usando el metodo toJSON de mongoose convertimos los datos a un json desestructurando del this.toObject();

UserSchema.methods.toJSON = function(){
    const {__V,code,__id,password,...user} = this.toObject();
    return user
}


//Definimos el Modelo User

const User:Model<IUser> = model<IUser>("User",UserSchema);

export default User;