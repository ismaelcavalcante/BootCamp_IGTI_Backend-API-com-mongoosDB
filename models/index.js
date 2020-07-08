import mongoose from 'mongoose';
import studentModel from './studentModels.js';
import dotenv from 'dotenv';

dotenv.config();

const db = {};

db.mongoose = mongoose;
db.student = studentModel(mongoose);
db.url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSW}@bootcampfullstack-dwnrk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

export { db };
