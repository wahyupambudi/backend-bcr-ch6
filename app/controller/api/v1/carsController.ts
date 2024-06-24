import { Request, Response } from "express";
const Cars = require("../../../services/carsService");
import { uploadToCloudinary } from "../../../utils/uploadCloudinary";

const handleCarsNotFound = (res: Response) => {
    return res.status(404).json({
        message: "Cars Not Found",
    })
}

export default {
    async getCars(_req: Request, res: Response) {
        try {
            const cars = await Cars.findAll();
            return res.status(200).json({
                message: "Success",
                cars
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async getCarsById(req: Request, res: Response) {
        try {
            const cars = await Cars.findById(req.params.id);

            if (!cars) {
                return handleCarsNotFound(res);
            }

            return res.status(200).json({
                message: "Success",
                cars
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async getCarsAvailable(_req: Request, res: Response) {
        try {
            const cars = await Cars.availableCars();
            return res.status(200).json({
                message: "Success",
                cars
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async getCarsDeleted(_req: Request, res: Response) {
        try {
            const cars = await Cars.deletedCars();
            return res.status(200).json({
                message: "Success",
                cars
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async createCar(req: Request, res: Response) {
        try {
            const {
                car_name,
                type,
                desc,
                seat,
                transmission,
                year,
                price,
                availabillity,
                start_rent,
                end_rent,
                img,
            } = req.body;

            // if field null
            if (!car_name || !type || !desc || !seat || !transmission || !year || !price || !availabillity || !start_rent || !end_rent) {
                return res.status(400).json({
                    message: "All fields are required"
                });
            }

            // if file not uploaded
            if (!req.file) {
                return res.status(400).json({ message: 'No Image Uploaded' });
            }

            // if user not found
            if (!req.user) {
                return res.status(400).json({ message: 'User Not Found' });
            }

            // use function from uploadCloudinary on folder utils
            const image = await uploadToCloudinary(req.file.buffer, req.file.mimetype, 'bcr_ch6');

            const carData = {
                user_id: req.user.id,
                car_name,
                type,
                desc,
                seat,
                transmission,
                year,
                price,
                availabillity,
                start_rent,
                end_rent,
                img: image.secure_url,
                created_At: new Date(),
                updated_At: new Date()
            }

            const cars = await Cars.createCar(carData);
            res.status(201).json({
                message: "Success",
                cars
            })
            return;
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Internal Server Error"
            })
            return;
        }
    },

    async updateCar(req: Request, res: Response) {
        try {
            const {
                car_name,
                type,
                desc,
                seat,
                transmission,
                year,
                price,
                availabillity,
                start_rent,
                end_rent,
                img,
            } = req.body;

            // if field null
            if (!car_name || !type || !desc || !seat || !transmission || !year || !price || !availabillity || !start_rent || !end_rent) {
                return res.status(400).json({
                    message: "All fields are required"
                });
            }

            // if file not uploaded
            if (!req.file) {
                return res.status(400).json({ message: 'No Image Uploaded' });
            }

            // if user not found
            if (!req.user) {
                return res.status(400).json({ message: 'User Not Found' });
            }

            // use function from uploadCloudinary on folder utils
            const image = await uploadToCloudinary(req.file.buffer, req.file.mimetype, 'bcr_ch6');

            const carData = {
                user_id: req.user.id,
                car_name,
                type,
                desc,
                seat,
                transmission,
                year,
                price,
                availabillity,
                start_rent,
                end_rent,
                img: image.secure_url,
                updated_At: new Date(),
            }

            const cars = await Cars.updateCar(req.params.id, carData);
            const data = await Cars.findById(req.params.id);

            if (!cars) {
                return handleCarsNotFound(res);
            }

            res.status(200).json({
                message: "Success",
                cars: data
            })
            return;
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Internal Server Error"
            })
            return;
        }
    },

    async deleteCar(req: Request, res: Response) {
        try {

            // if user not found
            if (!req.user) {
                return res.status(400).json({ message: 'User Not Found' });
            }

            // const carData = {
            //     user_id: req.user.id,
            //     deleted_At: new Date()
            // }

            // add new date to deleted_At.
            // const cars = await Cars.updateCar(req.params.id, carData);

            const cars = await Cars.deleteCar(req.params.id);


            if (!cars) {
                return handleCarsNotFound(res);
            }

            return res.status(200).json({
                message: "Success"
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}