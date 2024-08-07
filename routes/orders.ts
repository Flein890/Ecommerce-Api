import {Router} from "express";
import collectErrors from "../middlewares/collectErrors";
import {check} from "express-validator"
import validateJWT from "../middlewares/validateJWT";
import { isVerified } from "../middlewares/isVerified";
import { createOrder } from '../controllers/ordersController';
import { getOrders } from "../controllers/ordersController";


    
const router = Router();

router.get('/',[validateJWT,collectErrors],getOrders);

router.post("/",[
    validateJWT,
    isVerified,
    check("price","Price is required").not().isEmpty(),
    check("shippingCost","Shipping cost is required").not().isEmpty(),
    check("total","Total is required").not().isEmpty(),
    check("shippingDetails","Shipping Details are required").not().isEmpty(),
    check("items","Items array is required").not().isEmpty(),
],createOrder);

export default router;