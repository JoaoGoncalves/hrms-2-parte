import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../infrastructure/types/employee';
import { delay, tap } from 'rxjs';

@Injectable(/* {
  providedIn: 'root'
} */)
export class EmployeeService {

  constructor(private readonly http: HttpClient) { }

  getEmployees(){
    return this.http.get<Employee[]>('/employees')
  }

  getEmployee(id: number){
    return this.http.get<Employee>(`/employees/${id}`)/* .pipe(
      tap( ()=> console.log('inicio')),
      delay(3000),
      tap( ()=> console.log('fim')),
    ) */
  }

}
