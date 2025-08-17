import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {PageUser} from "../../model/page-user";
import {UserDTO} from "../../model/user-dto";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  currentPage?: number = 0;
  currentPageAddOne?: number = 1;
  previousPageNumber?: number = 1;
  currentNumber?: number = 2;
  nextPageNumber?: number = 3;
  size?: number = 0;
  height = "height: 0px";
  pageUser?: PageUser
  userDTOs?: UserDTO[]
  idUserLogin?: any

  constructor(private adminService: AdminService) {
    this.idUserLogin = localStorage.getItem("idUser")
    this.getAllUser(0, 10);
  }

  ngOnInit(): void {
  }

  action(idUser: any, action: any) {
    this.adminService.action(this.idUserLogin, idUser, action).subscribe(() => {
      this.getAllUser(this.currentPage, 10);
    })
  }

  changeToGetAllUser() {
    this.getAllUser(this.currentPage, 10);
  }

  getAllUser(page: any, size: any) {
    const searchElement = document.getElementById("search") as HTMLSelectElement | null;
    let search = searchElement?.value || '';
    if (search == null) search = ""
    this.adminService.getAllUser(page, size, search, this.idUserLogin).subscribe(rs => {
      this.pageUser = rs;
      this.userDTOs = this.pageUser?.content;
      this.size = this.pageUser?.content?.length
      if (this.size != null && this.size <= 2) {
        this.height = "height: 300px"
      }
      if (this.size != null && this.size < 5 && this.size > 2) {
        console.log("Vào đây 2")
        this.height = "height: 150px"
      }
    })
  }

  getAllUserByRole(role: any) {
    this.adminService.getAllUserByRole(this.currentPage, 10, role, this.idUserLogin).subscribe(rs => {
      this.pageUser = rs;
      this.userDTOs = this.pageUser?.content;
      this.size = this.pageUser?.content?.length
      if (this.size != null && this.size < 2) {
        this.height = "height: 300px"
      }
      if (this.size != null && this.size < 5 && this.size > 2) {
        this.height = "height: 150px"
      }
    })
  }

  previousPage() {
    if (this.currentPage != null && this.currentPage > 0) {
      this.currentPage--;
      this.currentPageAddOne = this.currentPage + 1
      this.getAllUser(this.currentPage, 10);
      if (this.currentPage == 0 || this.currentPage == 1) {
        this.currentNumber = 2
        this.previousPageNumber = 1
        this.nextPageNumber = 3
      } else {
        this.currentNumber = this.currentPage + 1
        this.previousPageNumber = this.currentPage
        this.nextPageNumber = this.currentPage + 2
      }
    }
  }

  nextPage() {
    if (this.pageUser?.content == null || this.pageUser?.content.length == 0) return
    if (this.currentPage != null && (this.currentPage + 1)
      // @ts-ignore
      * this.pageUser?.page?.number < this.pageUser?.page?.totalElements) {
      this.currentPage++;
      this.currentPageAddOne = this.currentPage + 1
      this.getAllUser(this.currentPage, 8);
      this.currentNumber = this.currentPage + 1
      this.previousPageNumber = this.currentPage
      this.nextPageNumber = this.currentPage + 2
    }
  }

}
