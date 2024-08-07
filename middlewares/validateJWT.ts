import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/user";

const validateJWT = async (req: Request, res:Response, next: NextFunction): Promise<void> => {
       
	const token = req.headers["x-token"] as string;  

	if (!token) {
		res.status(401).json({
			msg: "Missing token",
		});
        return;
	}

	try {
        const secretKey = process.env.SECRETKEY as string;
        const payload = jwt.verify(token, secretKey) as JwtPayload; 
				      
        const {id} = payload;

		const userConfirmed: IUser | null = await User.findById(id);


		if (!userConfirmed) {
			res.status(401).json({
				msg: "Token no válido",
			});
            return;
		}

		req.body.userConfirmed = userConfirmed;

		req.body.id = id;

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			msg: "Token no válido",
		});
	}
};

export default validateJWT;