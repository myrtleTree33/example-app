import winston from 'winston';
import expressWinston from 'express-winston';

const { NODE_ENV } = process.env;

// Set transports
let transports = [
  new winston.transports.Console({
    format: winston.format.simple(),
  }),
];

let format = winston.format.combine(
  winston.format.colorize(),
  winston.format.json(),
);

// Configure Cloudwatch-specific options
if (NODE_ENV === 'production') {
  transports = [
    ...transports,
    // Add other formatters here
  ];
  format = winston.format.combine(winston.format.json());
}

// Setup options
const opts = {
  level: 'info',
  format,
  transports,
  defaultMeta: { service: 'App' },
  meta: true,
};

// Expose logger
export const logger = winston.createLogger(opts);

// Expose logging middleware
export const loggingMiddleware = (): void =>
  expressWinston.logger({
    ...opts,
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: true,
    ignoreRoute: () => {
      return false;
    },
  });
