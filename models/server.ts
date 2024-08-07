import express,{ Express } from "express";
import cors from "cors"
import AuthRoutes from "../routes/auth";
import OrdersRoutes from "../routes/orders"
import { connectToDatabase } from "../database/config";

//Creamos la clase Server
export class Server {
    app: Express;
    port: string | number | undefined;
    authPath: string ;
    ordersPath: string;

    constructor() {

        this.app = express();
        this.port= process.env.PORT;
        this.authPath="/auth";
        this.ordersPath="/order"

        //todos estos metodos se ejecutaran una ves llamado a una instancia de Server
        this.DBconnection();
        this.middlewares();
        this.routes();
        //---------------------------------------------------------------------------//
    }
          
     //La conexión a la base de datos siempre devuelve una promesa a resolver que no retorna nada y es asincrona
      async DBconnection(): Promise<void> {
       await connectToDatabase();
     }

     middlewares():void{
        //Activa el CORS (Cross Origin resource sharing), esto permite peticiones de diferentes origenes para acceder
        //a los recursos de la aplicación
         this.app.use(cors());
        //-----------------------------------------------------------------------------------------------------------//
        //Manejo de datos JSON en aplicaciones Express
         this.app.use(express.json());
     }

   routes():void{
       this.app.use(this.authPath,AuthRoutes);
       this.app.use(this.ordersPath,OrdersRoutes)
   }

    listen():void{
        this.app.listen(this.port,()=>{
            console.log(`Server running on port ${this.port}`);
        })

      }

}
