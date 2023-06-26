import mongoose from 'mongoose';
import { IEmployees } from '../types/employeeType';

const Schema = mongoose.Schema;

const employeeSchema = new Schema<IEmployees>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Employee', employeeSchema);
