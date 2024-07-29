import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  diverseForm!: FormGroup;
  employeeModObj: EmployeeModel = new EmployeeModel();
  employeeData: any;
  showCreate!: boolean;
  showUpdate!: boolean;
  isEdit: boolean = false;
  highestId: number = 0;
  page: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 0;
  paginatedEmployeeData: any[] = [];



  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.diverseForm = this.formBuilder.group({
      name: [''],
      module: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    })
    this.getAllEmployee()
  }

  clickCreate() {
    this.diverseForm.reset();
    this.showCreate = true;
    this.showUpdate = false
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login'])

  }

  postEmployeeDetails() {

    if (!this.isEdit) {
      this.highestId++;
      this.employeeModObj.id = this.highestId;
    }

    this.employeeModObj.name = this.diverseForm.value.name;
    this.employeeModObj.module = this.diverseForm.value.module;
    this.employeeModObj.email = this.diverseForm.value.email;
    this.employeeModObj.mobile = this.diverseForm.value.mobile;
    this.employeeModObj.salary = this.diverseForm.value.salary;

    this.apiService.postEmployee(this.employeeModObj)
      .subscribe(response => {
        console.log(response);
        alert("Employee Added Successfully")
        let reference = document.getElementById("cancel")
        reference?.click();
        this.diverseForm.reset();
        this.getAllEmployee()
      }, err => {
        return alert("Something went wrong")
      })
  }

  getAllEmployee() {
    this.apiService.getEmployee()
      .subscribe(response => {
        this.employeeData = response
        this.totalPages = Math.ceil(this.employeeData.length / this.itemsPerPage);
        this.updatePaginatedData();
      })
  }

  deleteEmployee(e: any) {
    this.apiService.deleteEmployee(e.id)
      .subscribe(response => {
        alert("Employee Deleted")
        this.getAllEmployee()
      })
  }

  onEditEmp(e: any) {
    this.showCreate = false;
    this.showUpdate = true;
    this.employeeModObj.id = e.id;
    this.diverseForm.controls['name'].setValue(e.name)
    this.diverseForm.controls['module'].setValue(e.module)
    this.diverseForm.controls['email'].setValue(e.email)
    this.diverseForm.controls['mobile'].setValue(e.mobile)
    this.diverseForm.controls['salary'].setValue(e.salary)

  }

  updateEmployeeDetails() {
    this.employeeModObj.name = this.diverseForm.value.name;
    this.employeeModObj.module = this.diverseForm.value.module;
    this.employeeModObj.email = this.diverseForm.value.email;
    this.employeeModObj.mobile = this.diverseForm.value.mobile;
    this.employeeModObj.salary = this.diverseForm.value.salary;
    this.apiService.updateEmployee(this.employeeModObj, this.employeeModObj.id)
      .subscribe(response => {
        alert("Employee data updated")
        let reference = document.getElementById("cancel")
        reference?.click();
        this.diverseForm.reset();
        this.getAllEmployee()
      })
  }

  updatePaginatedData() {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    this.paginatedEmployeeData = this.employeeData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(pageNumber: number) {
    this.page = pageNumber;
    this.updatePaginatedData();
  }




}
