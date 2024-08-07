import { NextFunction, Request, Response } from "express";

export const isVerified = (req: Request, res: Response, next: NextFunction) => {

    const { verified } = req.body.usuarioConfirmado;

    if (!verified) {
        res.status(401).json({
            msg: "The user is not correctly verified"
        })
        return
    }

    next();
}