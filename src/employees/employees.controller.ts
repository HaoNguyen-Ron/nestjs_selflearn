import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeesDto } from './dto/update-employees.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}
  // GET/employees
  @Get()
  getEmployeeAll(@Query('role') role: 'FE' | 'BE') {
    return this.employeeService.getEmployees(role);
  }

  //GET/employees/:id
  @Get(':id')
  getEmployeeId(@Param('id') id: string) {
    return this.employeeService.getEmployeeId(+id);
  }

  @Post()
  createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @Put(':id')
  updateEmployee(
    @Param('id') id: string,
    @Body() updateNinjaDto: UpdateEmployeesDto,
  ) {
    return this.employeeService.updateEmployee(+id, updateNinjaDto);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: string) {
    return this.employeeService.deleteEmployee(+id);
  }
}
