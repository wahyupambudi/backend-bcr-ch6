import { Request, Response } from "express";
const User = require("../../../services/userService");
const { hashPassword, comparePassword, createToken } = require("../../../utils/authUser");

export default {
    async register(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const user = await User.findByEmail(email);

        if (user) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            });
        }

        const hashingPassword = await hashPassword(password);

        const userData = {
            name, email,
            password: hashingPassword,
            created_At: new Date(),
            updated_At: new Date()
        }

        try {
            const user = await User.createUser(userData);
            return res.status(201).json({
                message: "Success",
                user
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async login(req: Request, res: Response) {
        try {
            const email = req.body.email as string;
            const password = req.body.password as string;

            // get user by email
            const user = await User.findByEmail(email);

            // check user by email
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            // validate password with hash bcrypt
            const isPasswordCorrect = await comparePassword(password, user.password)

            if (!isPasswordCorrect) {
                return res.status(401).json({
                    message: "Password Incorrect"
                })
            }

            const token = await createToken({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                created_At: user.created_At,
                updated_At: user.updated_At,
            })

            res.status(200).json({
                id: user.id,
                email: user.email,
                token,
                created_At: user.created_At,
                updated_At: user.updated_At,
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async loginWithGoogle(req: Request, res: Response) {
        const reqPayload = req.body.payload;
        const email = reqPayload.email;
        const name = reqPayload.name;
        const hashingPassword = await hashPassword(reqPayload.jti);

        try {
            const user = await User.findByEmail(email);
            
            if(!user) {
                await User.createUser({
                    email: email,
                    name: name,
                    password: hashingPassword,
                    created_At: new Date(),
                    updated_At: new Date()
                });
            }
            
            const token = await createToken({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                created_At: user.created_At,
                updated_At: user.updated_At,
            })
            
            // console.log(`tokenbackend : ${token}`)

            return res.status(201).json({
                message: "Success",
                token
            });
            
        } catch (err) {
            return res.status(500).json(err);
            // console.log(err)
        }
    },

    async whoami(req: Request, res: Response) {
        try {
            return res.status(200).json(req.user);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}