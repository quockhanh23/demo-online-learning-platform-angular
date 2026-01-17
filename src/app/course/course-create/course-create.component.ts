import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../service/course.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Course} from "../../model/course";
import {whitespaceValidator} from "../../app.component";

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {

  idUserLogin?: any

  courseForm: FormGroup = this.formBuilder.group({
    courseName: new FormControl('', [Validators.required, whitespaceValidator()]),
    courseDescription: new FormControl(''),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });

  constructor(private courseService: CourseService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.idUserLogin = localStorage.getItem("idUser")
  }

  ngOnInit(): void {
  }

  createCourse() {
    if (this.idUserLogin == null) {
      return
    }
    let course: Course = {
      courseName: this.courseForm.value.courseName,
      courseDescription: this.courseForm.value.courseDescription,
      startDate: this.courseForm.value.startDate,
      endDate: this.courseForm.value.endDate,
    };
    this.courseService.createCourse(course, this.idUserLogin).subscribe(() => {
      this.router.navigate(['/']).then()
    })
  }
}
