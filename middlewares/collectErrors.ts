//Importar los tipos Request Response y NextFunction (from express) para asignarselos a los parametros de la funcion recolectora
//Importar validationResult(función), Result(tipo) y ValidationError(tipo)  de express-validator
//Recolectar los errores con la funcion validationResult pasandole el pedido
//y guardarlos en una variable de tipo Result<ValidationError>
//Si hay errores devolver status(400) y pasarlo a json, de lo contrario continuar con next

import { Request,Response,NextFunction } from "express";
import { validationResult, Result, ValidationError } from "express-validator";

const collectErrors = (req:Request,res:Response,next:NextFunction):void=>{
    const errors:Result<ValidationError> = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json(errors)
    }
    else{
        next();
    }

}
export default collectErrors;