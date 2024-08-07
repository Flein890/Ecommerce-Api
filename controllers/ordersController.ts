import { Request,Response } from "express";
import NewOrder,{IOrder} from "../models/orderM";
import { ObjectId } from "mongoose";

export const getOrders = async (req:Request,res:Response):Promise<void>=>{

      //traemos el id 
      const userID:ObjectId = req.body.userConfirmed._id;
      //le asignamos el id al user
      const request = {user:userID};
      //buscamos la orden relacionada con el id del usuario
      const orders = await NewOrder.find(request);

      res.json({
        data:[...orders]
      });
};

export const createOrder = async(req:Request, res:Response):Promise<void> =>{

      //guardamos el id del user
      const userID:ObjectId = req.body.userConfirmed._id;
      //guardamos toda la info del pedido
      const orderData:IOrder = req.body;

      
      const data = {
            ...orderData,
            user:userID,
            createdAt: new Date(),
            status:"pending",
      };
       
      //creamos la orden instanciando el modelo NewOrder y pasandole los datos
      const order = new NewOrder(data)

      //guardar en la base de datos
      await order.save();

      //devolvemos la orden
      res.status(201).json({order});
      
}