import { employeeDetailResolver } from "../../shared/resolvers/employee-detail.resolver";
import { CreateEmployeeComponent } from "./create-employee.component";
import { EditEmployeeComponent } from "./edit-employee.component";
import { EmployeeDetailsComponent } from "./employee-details.component";
import { EmployeeListComponent } from "./employee-list.component";

export const routes =[
  {path: 'list', component: EmployeeListComponent},
  {
    path: 'details/:id',
    component: EmployeeDetailsComponent,
    resolve: {employee: employeeDetailResolver}
  },
  {path: 'create', component: CreateEmployeeComponent},
  {path: 'edit', component: EditEmployeeComponent},
]
