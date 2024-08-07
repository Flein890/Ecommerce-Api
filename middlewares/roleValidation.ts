import { NextFunction, Request, Response } from "express";
import { ROLES } from "../helpers/constantValues";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {

    const {role} = req.body.usuarioConfirmado;

    if(role !== ROLES.ADMIN) {
        res.status(401).json({
            msg: "The user is not admin"
        })
        return
    }

    next();
}