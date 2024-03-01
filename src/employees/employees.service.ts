import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeesDto } from './dto/update-employees.dto';

@Injectable()
export class EmployeesService {
  private employees = [
    { id: 1, name: 'Ron', role: 'FE' },
    { id: 2, name: 'Rin', role: 'BE' },
  ];

  getEmployees(role?: 'FE' | 'BE') {
    if (role) {
      return this.employees.filter((employee) => employee.role === role);
    }
    return this.employees;
  }

  getEmployeeId(id: number) {
    const employee = this.employees.find((emp) => emp.id === id);

    if (!employee) {
      throw new Error('Employee not found');
    }
    return employee;
  }

  createEmployee(createEmployeeDto: CreateEmployeeDto) {
    const newEmp = {
      ...createEmployeeDto,
      id: Date.now(),
    };
    this.employees.push(newEmp);

    return newEmp;
  }

  updateEmployee(id: number, updateEmployeesDto: UpdateEmployeesDto) {
    this.employees = this.employees.map((employee) => {
      if (employee.id === id) {
        return { ...employee, ...updateEmployeesDto };
      }

      return employee;
    });
    return this.getEmployeeId(id);
  }

  deleteEmployee(id: number) {
    const toBeRemoved = this.getEmployeeId(id);
    this.employees = this.employees.filter((emp) => emp.id !== id);

    return toBeRemoved;
  }
}
