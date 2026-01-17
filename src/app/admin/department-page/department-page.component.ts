import {Component, OnInit} from '@angular/core';
import {DepartmentService} from "../../service/department.service";
import {PageDepartment} from "../../model/page-department";
import {Department} from "../../model/department";

@Component({
  selector: 'app-department-page',
  templateUrl: './department-page.component.html',
  styleUrls: ['./department-page.component.css']
})
export class DepartmentPageComponent implements OnInit {

  title = "Quản lý bộ môn"
  idUserLogin?: any
  size: number | undefined = 0
  height = "height: 500px"
  pageDepartment?: PageDepartment
  departments?: Department[]

  constructor(private departmentService: DepartmentService) {
    this.idUserLogin = localStorage.getItem("idUser")
  }

  ngOnInit(): void {
    this.getAllDepartment(0, 10);
  }

  action(idDepartment: any, action: any) {
    this.departmentService.action(this.idUserLogin, idDepartment, action).subscribe(() => {
      this.getAllDepartment(0, 10);
    })
  }

  getAllDepartment(page: any, size: any) {
    const searchElement = document.getElementById("search") as HTMLSelectElement | null;
    let search = searchElement?.value || '';
    if (search == null) search = ""
    this.departmentService.getAllDepartment(this.idUserLogin, page, size, "", search).subscribe(rs => {
      this.pageDepartment = rs;
      this.departments = this.pageDepartment?.content;
      this.size = this.pageDepartment?.content?.length
      if (this.size != null && this.size <= 2) {
        this.height = "height: 500px"
      }
      if (this.size != null && this.size < 5 && this.size > 2) {
        this.height = "height: 200px"
      }
    })
  }
}
