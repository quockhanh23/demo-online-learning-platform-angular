import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  idUser?: any
  username?: any
  token?: any
  count: any
  role?: any
  isAdmin = false;

  constructor() {
    this.idUser = localStorage.getItem("idUser")
    console.log("this.idUser: " + this.idUser)
    this.username = localStorage.getItem("username")
    this.token = localStorage.getItem("token")
    this.role = localStorage.getItem("roles")
  }

  ngOnInit(): void {
    this.checkAdmin();
  }

  checkAdmin() {
    if (this.role != null) {
      let index = this.role?.indexOf("ADMIN")
      console.log("index:" + index)
      if (index > 0) this.isAdmin = true;
    }
  }

  logout() {
    localStorage.clear()
  }
}
