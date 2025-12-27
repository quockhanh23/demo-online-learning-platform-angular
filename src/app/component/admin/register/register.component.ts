import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../model/user";
import {whitespaceValidator} from "../../../app.component";
import {AdminService} from "../../../service/admin.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../dialog/dialog.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title = "Đăng Ký"
  user?: User
  messageError?: string
  userForm: FormGroup = this.formBuilder.group({
    username: new FormControl('', [Validators.required, whitespaceValidator()]),
    fullName: new FormControl('', [Validators.required, whitespaceValidator()]),
    password: new FormControl('', [Validators.required, whitespaceValidator()]),
    confirmPassword: new FormControl('', [Validators.required, whitespaceValidator()]),
    phoneNumber: new FormControl('',),
    email: new FormControl('',),
    education: new FormControl('',),
    role: new FormControl('',),
  });

  constructor(private adminService: AdminService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  register() {
    let user = {
      username: this.userForm.value.username,
      fullName: this.userForm.value.fullName,
      password: this.userForm.value.password,
      confirmPassword: this.userForm.value.confirmPassword,
      phoneNumber: this.userForm.value.phoneNumber,
      email: this.userForm.value.email,
      education: this.userForm.value.education,
    }
    let role = this.userForm.value.role
    if ("Học sinh" == role) role = "STUDENT"
    if ("Giáo viên" == role) role = "TEACHER"
    this.adminService.register(user, role).subscribe(rs => {
      this.user = rs;
      this.router.navigate(['/adminPage']).then()
      this.dialog.open(DialogComponent)
    }, error => {
      this.messageError = error.error.message
    })
  }
}
