import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";

import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserDTO} from "../../model/user-dto";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = "Đăng nhập"
  messageError?: string;
  message = "Đăng nhập thành công"
  loading = false;
  userDTO?: UserDTO;
  userForm: FormGroup = this.formBuilder.group({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    this.messageError = undefined;
    this.loading = true;
    let loginRequest = {
      username: this.userForm.value.username,
      password: this.userForm.value.password
    }
    this.userService.login(loginRequest).subscribe(rs => {
      this.userDTO = rs;
      localStorage.setItem("username", <string>this.userDTO.username)
      localStorage.setItem("idUser", <string>this.userDTO.id)
      localStorage.setItem("roles", JSON.stringify(this.userDTO.roles))
      setTimeout(() => {
        this.router.navigate(['/']).then()
      }, 800);
      this.loading = false;
    }, error => {
      this.messageError = error.error.message;
      this.loading = false;
    })
  }
}
