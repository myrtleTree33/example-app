import http from 'http';
import 'express-async-errors';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import helmet from 'helmet';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { logger, loggingMiddleware } from './utils/logger';

import studentController from './controller/studentController';
import classController from './controller/classController';

const { PORT } = process.env;

logger.info('Starting API..');

// Patch duration library
dayjs.extend(duration);

const app = express();

// Init helmet
app.use(helmet());

// cors
const corsOptions = {
  origin: [`http://localhost:${PORT}`],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// middleware
app.use(loggingMiddleware());
app.use(bodyParser.json());
app.use(cors(corsOptions));

// controllers
app.use('/student', studentController);
app.use('/class', classController);

// Error-handling middleware
app.use((err, req, res, next): void => {
  logger.error(`Error occurred: ${err}`);
  logger.error('Running err handler');
  res.status(403).send({
    message: 'Unexpected error occured while running request.',
  });

  next(err);
});

// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Time to document that Express API you built',
      version: '1.0.0',
      description:
        'A test project to understand how easy it is to document and Express API',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'Joel Tong',
        url: 'https://devnull.io',
        email: 'me@joeltong.org',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./controller/studentController.js'],
};
const specs = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve);
app.get(
  '/docs',
  swaggerUi.setup(specs, {
    explorer: true,
  }),
);

// start app
const httpServer = http.createServer(app);
httpServer.listen(PORT, () => logger.info(`API listening on port ${PORT}!`));
