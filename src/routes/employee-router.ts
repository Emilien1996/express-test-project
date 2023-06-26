import { Router } from 'express';
import {
  createEmployees,
  deleteEmployee,
  getEmployees,
  singleEmployee,
  updateEmployee,
} from '../controllers/employeController';

export const employeeRoute = Router({});

employeeRoute.get('/', getEmployees);
employeeRoute.post('/', createEmployees);
employeeRoute.put('/', updateEmployee);
employeeRoute.delete('/', deleteEmployee);

employeeRoute.get('/:id', singleEmployee);