import mongoose from 'mongoose';
import { IEmployees } from '../types/employeeType';

const Schema = mongoose.Schema;

const employeeSchema = new Schema<IEmployees>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Employee', employeeSchema);
