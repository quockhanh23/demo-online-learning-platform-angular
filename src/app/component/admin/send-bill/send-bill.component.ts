import {Component, OnInit} from '@angular/core';
import {PageUser} from "../../../model/page-user";
import {UserDTO} from "../../../model/user-dto";
import {AdminService} from "../../../service/admin.service";
import {TuitionService} from "../../../service/tuition.service";

@Component({
  selector: 'app-send-bill',
  templateUrl: './send-bill.component.html',
  styleUrls: ['./send-bill.component.css']
})
export class SendBillComponent implements OnInit {

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
  selectedUserIds: number[] = [];

  constructor(private adminService: AdminService,
              private tuitionService: TuitionService) {
    this.idUserLogin = localStorage.getItem("idUser")
    this.getAllUserByRole("STUDENT");
  }

  ngOnInit(): void {
  }

  onCheckboxChange(userId: string | number | undefined, event: any): void {
    if (userId === undefined) return;

    const idNum = Number(userId);

    if (event.target.checked) {
      // nếu chưa có thì thêm vào
      if (!this.selectedUserIds.includes(idNum)) {
        this.selectedUserIds.push(idNum);
      }
    } else {
      // bỏ ra khỏi danh sách nếu bỏ tick
      this.selectedUserIds = this.selectedUserIds.filter(id => id !== idNum);
    }

    console.log('Selected IDs:', this.selectedUserIds);
  }

  changeToGetAllUser() {
    this.getAllUserByRole("STUDENT");
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
      this.adminService.getAllUserByRole(this.currentPage, 10, "STUDENT", this.idUserLogin).subscribe(rs => {
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
      this.adminService.getAllUserByRole(this.currentPage, 8, "STUDENT", this.idUserLogin).subscribe(rs => {
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
      this.currentNumber = this.currentPage + 1
      this.previousPageNumber = this.currentPage
      this.nextPageNumber = this.currentPage + 2
    }
  }

  createTuition() {
    if (this.selectedUserIds.length === 0) {
      return;
    }
    console.log('Gửi hóa đơn cho:', this.selectedUserIds);

    let title = (document.getElementById("title") as HTMLSelectElement).value
    let description = (document.getElementById("description") as HTMLSelectElement).value
    let money = (document.getElementById("money") as HTMLSelectElement).value

    let tuition = {
      title: title,
      description: description,
      money: money
    }
    this.tuitionService.createTuition(this.selectedUserIds, tuition).subscribe(() => {
      }
    )
  }

}
