import {Model,Schema,Types,model} from "mongoose";

//Interfaces
interface IShippingDetail{
    name:string,
    cellphone:string,
    location:string,
    address:string,
}

interface IItem{
    desc:string,
    id:number,
    price:number,
    quantity:number,
    title:string,
}

export interface IOrder{
    createdAt: Date,
    user:Types.ObjectId,
    price:number,
    shippingCost:number,
    items:IItem[],
    shippingDetails:IShippingDetail,
    status:string,
    total:number
}

//Schema

const OrderSchema = new Schema <IOrder>({
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    price:{
        type:Number,
        required:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    shippingCost:{
        type:Number,
        required:true,
    },
    items:{
        type:[{
            desc:{
                type:String,
                required:true,
            },
            id:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
            },
            title:{
                type:String,
                required:true,
            }
        }],
    },
    shippingDetails:{
        name:{
            type:String,
            required:true,
        },
        cellphone:{
            type:Number,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true,
        }
    },

    status:{
        type:String,
        required:true,
    },
    total:{
        type:Number,
        required:true
    }
});

const NewOrder:Model<IOrder> = model<IOrder>("NewOrder",OrderSchema);

export default NewOrder