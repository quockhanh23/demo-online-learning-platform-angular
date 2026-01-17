import {Component} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Học trực tuyến';

  constructor() {
  }
}

export function whitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isWhitespace = control.value.trim().length === 0;
    return isWhitespace ? {'whitespace': true} : null;
  };
}

// @ts-ignore
export function checkRole(roles: any): string {
  if (roles != null) {
    let role: string = JSON.stringify(roles);
    let indexTeacher = role.indexOf("TEACHER");
    let indexStudent = role.indexOf("STUDENT");
    let indexAdmin = role.indexOf("ADMIN");
    if (indexTeacher > 0) {
      return "TEACHER"
    }
    if (indexStudent > 0) {
      return "STUDENT"
    }
    if (indexAdmin > 0) {
      return "ADMIN"
    }
    return ""
  }
}
