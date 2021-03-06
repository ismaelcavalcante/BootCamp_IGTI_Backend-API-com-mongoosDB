import winston from 'winston';
import winstondb from 'winston-mongodb';
import dotenv from 'dotenv';

const { combine, timestamp, label, printf } = winston.format;

const { createLogger, transports } = winston;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

dotenv.config();

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.MongoDB({
      level: 'info',
      db: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSW}@bootcampfullstack-dwnrk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      collection: 'logs_grades',
      capped: true,
      cappedMax: 20,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
  ],
  format: combine(label({ label: 'grade-api' }), timestamp(), myFormat),
});

export { logger };
