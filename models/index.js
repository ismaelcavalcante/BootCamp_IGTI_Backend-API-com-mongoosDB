import mongoose from 'mongoose';
import studentModel from './studentModels.js';

const db = {};

db.mongoose = mongoose;
db.student = studentModel(mongoose);
db.url =
  'mongodb+srv://ismael:is23568974@bootcampfullstack-dwnrk.mongodb.net/grades?retryWrites=true&w=majority';

export { db };
