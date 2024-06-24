const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
import dotenv from "dotenv";

dotenv.config();

export const hashPassword = async (password: string): Promise<string> => {
    const saltParse = Number(process.env.JWT_SIGNATURE_KEY || 10);
    const salt = bcrypt.genSaltSync(saltParse);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const isMatch: boolean = bcrypt.compareSync(password, hashedPassword);
    return isMatch;
}

export const createToken = async (payload: any) => {
    return jwt.sign(payload, process.env.SECRET_KEY || "Rahasia");
}