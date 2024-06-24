// import swaggerJsdoc from 'swagger-jsdoc';
// import swaggerDocument from "../openapi.yml";
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import YAML from 'yamljs';
import path from 'path';

const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yml'));

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API For Binar Car Rental',
            version: '1.0.0',
            description: 'Challenge Chapter 6 - REST API Binar Car Rental with Express Js, Typescript, Postgres, JWT, Documentation with OPEN API ',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
            },
        ],
    },
    apis: ['./app/routes/*.ts', './app/models/*.ts'],
};

// const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app: Express): void => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupSwagger;
