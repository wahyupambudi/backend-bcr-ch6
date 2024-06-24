import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

// Extend Express.Request with user property (assuming user has an 'id' property)
declare global {
    namespace Express {
        interface Request {
            user?: { id: number, role: string };
        }
    }
}

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({
                message: "User Unauthorized"
            });
        }

        const token = authorization.split("Bearer ")[1];
        // console.log(token)

        const user = await jwt.verify(token, process.env.SECRET_KEY || "Rahasia");
        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const restrictUsers = (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        if (user.role !== 'superadmin') {
            return res.status(403).json({
                message: "Forbidden: Access denied"
            })
        }
        next();
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const restrictMember = (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        if (user.role === 'member') {
            return res.status(403).json({
                message: "Forbidden: Access denied"
            })
        }
        next();
    } catch (err) {
        return res.status(500).json(err)
    }
}