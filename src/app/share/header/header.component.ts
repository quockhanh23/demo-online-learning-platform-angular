import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

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

  constructor(private router: Router,) {
    this.idUser = localStorage.getItem("idUser")
    console.log("this.idUser: " + this.idUser)
    this.username = localStorage.getItem("username")
    this.token = localStorage.getItem("token")
    this.role = localStorage.getItem("roles")
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear()
  }
}
