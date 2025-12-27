import {Component, OnInit} from '@angular/core';
import {DepartmentService} from "../../service/department.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {whitespaceValidator} from "../../app.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {

  idUserLogin?: any
  title = ""

  departmentForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required, whitespaceValidator()]),
    description: new FormControl(''),
  });

  constructor(private departmentService: DepartmentService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.idUserLogin = localStorage.getItem("idUser")
  }

  ngOnInit(): void {
  }

  createDepartment() {
    if (this.idUserLogin == null) return
    let obj = {
      name: this.departmentForm.value.name,
      description: this.departmentForm.value.description
    }
    this.departmentService.createDepartment(obj, this.idUserLogin).subscribe(() => {
      this.router.navigate(['/departmentPage']).then()
    })
  }
}
