import { Request, Response } from 'express';
import EmployeeDB from '../model/Employee';
import { Types } from 'mongoose';
import { IEmployees } from '../types/employeeType';

export const getEmployees = async (req: Request, res: Response) => {
  const employees = await EmployeeDB.find().exec();
  if (!employees?.length)
    return res.status(204).send({
      message: 'employees not found',
    });
  return res.send(employees);
};

export const createEmployees = async (req: Request<{}, {}, Partial<IEmployees>>, res: Response) => {
  console.log(req.body);
  if (!req.body.firstname || !req.body.lastname)
    return res.status(400).send({
      message: 'firstname and lastname are required',
    });
  try {
    const newEmployee = await EmployeeDB.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.status(201).send(newEmployee);
  } catch (err) {
    console.log(err);
  }
};

export const updateEmployee = async (req: Request<{}, {}, Partial<{ id: string } & IEmployees>>, res: Response) => {
  if (req.body?.id) {
    return res.status(400).send({
      message: 'id parameter is required',
    });
  }
  const employee = await EmployeeDB.findOne({
    _id: req.body.id,
  }).exec();
  if (!employee) {
    return res.status(204).send({
      message: `no employee matches ID ${req.body.id}`,
    });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save();
  return res.send(result);
};

export const deleteEmployee = async (req: Request<{}, {}, Partial<{ id: string }>>, res: Response) => {
  if (req.body?.id) {
    return res.status(400).send({
      message: 'id parameter is required',
    });
  }
  const employee = await EmployeeDB.findOne({
    _id: req.body.id,
  }).exec();
  if (!employee) {
    return res.status(204).send({
      message: `no employee matches ID ${req.body.id}`,
    });
  }
  const result = await employee.deleteOne({
    _id: req.body.id,
  });
  return res.send(result);
};

export const singleEmployee = async (req: Request<{ id?: string }>, res: Response) => {
  if (!req.params?.id || !Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({
      message: 'Employee id is required',
    });
  console.log(req.params.id);

  try {
    const employee = await EmployeeDB.findOne({
      _id: `${req.params.id}`,
    }).exec();

    if (!employee)
      return res.status(204).send({
        message: `Employee not found with id ${req.params.id}`,
      });
    return res.send(employee);
  } catch (err) {
    console.log({ err });
  }
};
