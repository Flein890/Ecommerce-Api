import { Router } from "express";
import { check } from "express-validator";
import { existsEmail } from "../helpers/DBvalidations";
import collectErrors from "../middlewares/collectErrors";
import {register} from '../controllers/authentification'
import { login } from "../controllers/authentification";
import { verifyUser } from "../controllers/authentification";
import { getUser } from "../controllers/authentification";


//This TypeScript code snippet is defining an Express.js router with a single POST route at /register.
// The route expects a request body with name, email and password
//The check function from express-validator is used to validate the request body. It checks that the name
// field is not empty, the [email] field is a valid email, and the password field meets a certain criteria (which is not specified in the code).
//Finally, the register function from the ../controllers/authentification module is called if all the validations pass.
//_____
const router = Router();

//primero la ruta, despues el middleware, y ultimo el controlador


router.post("/register",[

    check('name','Name is required').not().isEmpty(),
    check('email','Email is not valid').isEmail(),
    check('password', 'pass must be 6 char length').isLength({min:6}),
    check('email').custom(existsEmail),

    collectErrors,
    
],register);

router.post("/login",[
    check("email","Mail is required").isEmail(),
    check("password","Password must be 6 char length").isLength({min:6}),

    collectErrors
    
],login)

router.patch("/verify",[
    check("email","Email required").not().isEmpty().isEmail(),
    check("code","Verification code required").not().isEmpty(),

    collectErrors

],verifyUser)



router.get("/user",[
    collectErrors,
],getUser)





export default router;

