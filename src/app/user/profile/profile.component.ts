import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {ActivatedRoute} from "@angular/router";
import {checkRole} from "../../app.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  idUserLogin?: any
  user?: User
  messageError?: string
  urlPage?: any
  roles?: any
  rolesCheck?: any

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,) {
    this.urlPage = localStorage.getItem("beforeUrl")
    this.roles = localStorage.getItem("roles")
    this.rolesCheck = checkRole(this.roles)
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      let idUser = rs.get('id')
      this.getDetailUser(idUser);
    })
  }

  getDetailUser(idUser: any) {
    this.messageError = undefined
    this.userService.getDetailUser(idUser).subscribe(rs => {
      this.user = rs
    }, error => {
      this.messageError = error.error.message
    })
  }

  ngOnDestroy(): void {
    localStorage.removeItem("beforeUrl")
  }
}
