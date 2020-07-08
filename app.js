import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import { gradeRouter } from './routes/gradeRouter.js';
import { logger } from './config/logger.js';
import { db } from './models/index.js';

dotenv.config();

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    logger.info('Conectado ao banco de dados');
  } catch (error) {
    logger.error(`Erro ao conectar no banco de dados! ${error}`);

    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(gradeRouter);

app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(() => {
  logger.info(`Servidor em execucao`);
});
