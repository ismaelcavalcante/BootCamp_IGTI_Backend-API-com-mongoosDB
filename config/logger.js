import winston from 'winston';
import winstondb from 'winston-mongodb';

const { combine, timestamp, label, printf } = winston.format;

const { createLogger, transports } = winston;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.MongoDB({
      level: 'info',
      db: `${process.env.MONGODB}`,
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
