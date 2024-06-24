import { Request, Response } from "express";
const User = require("../../../services/userService");
const {hashPassword} = require("../../../utils/authUser");

const handleUserNotFound = (res: Response) => {
    return res.status(404).json({
        message: "User not found"
    });
}

export default {
    async getUsers(req: Request, res: Response) {
        try {
            const users = await User.findAll();
            return res.status(200).json({
                message: "Success",
                users
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async getUserById(req: Request, res: Response) {
        try {
            const users = await User.findById(req.params.id);

            if (!users) {
                return handleUserNotFound(res);
            }

            return res.status(200).json({
                message: "Success",
                users
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async getUserByEmail(req: Request, res: Response) {
        const email = req.query.email as string;

        try {
            const users = await User.findByEmail(email);

            if (!users) {
                return handleUserNotFound(res);
            }

            return res.status(200).json({
                message: "Success",
                users
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    },


    async createUser(req: Request, res: Response) {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
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
            role,
            created_At: new Date(),
            updated_At: new Date()
        }

        try {
            const users = await User.createUser(userData);
            return res.status(201).json({
                message: "Success",
                users
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async updateUser(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            });
        }

        const userData = {
            name, email, password,
            updated_At: new Date()
        }

        try {
            const users = await User.updateUser(req.params.id, userData);
            const data = await User.findByEmail(email);

            if (!users) {
                return handleUserNotFound(res);
            }

            return res.status(200).json({
                message: "Success",
                users: data
            });
        } catch (err) {

            return res.status(500).json(err);
        }
    },

    async deleteUser(req: Request, res: Response) {
        try {
            const users = await User.deleteUser(req.params.id);

            if (!users) {
                return handleUserNotFound(res);
            }

            return res.status(200).json({
                message: "Success"
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}
