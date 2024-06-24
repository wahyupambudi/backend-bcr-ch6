import express, { Express, Request, Response } from 'express';
import dotenv from "dotenv";
import knex from "knex";
import { Model } from "objection";
import userRouter from "../app/routes/users.route";
import carsRouter from "../app/routes/cars.route";
import authRouter from "../app/routes/auth.route";
import logRouter from "../app/routes/log.route";
import setupSwagger from './swagger';
const cors = require('cors');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const knexInstance = knex({
    client: "pg",
    connection: {
        database: process.env.DATABASE,
        user: process.env.USER,
        password: process.env.PASSWORD,
        port: 5432
    }
})

Model.knex(knexInstance);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cars", carsRouter);
app.use("/api/v1/logs", logRouter);

app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
        message: "Rest API Binar Car Rental"
    })
})

setupSwagger(app); // Setup Swagger UI

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})


export default app;