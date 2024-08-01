import User, {IUser} from "../models/user";

//Creamos una funcion que devuelve una promesa a resolver que no devuelve nada
//buscamos si existe el mail con el metodo findOne() y desestructuramos el mail
//la variable creada tiene que ser de tipo IUser o null para que podamos buscar en User
//en caso de q exista el mail tirar un error

export const existsEmail = async(email:string):Promise<void> =>{

    const existEmail: IUser | null = await User.findOne({email});

    if(existEmail){
        throw new Error(`The mail ${email} is registered`);
    }
}