import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../service/course.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Course} from "../../model/course";

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {

  courseForm: FormGroup = this.formBuilder.group({
    courseName: new FormControl(''),
    courseDescription: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });

  constructor(private courseService: CourseService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  createCourse() {
    let course: Course = {
      courseName: this.courseForm.value.courseName,
      courseDescription: this.courseForm.value.courseDescription,
      startDate: this.courseForm.value.startDate,
      endDate: this.courseForm.value.endDate,
    };
    this.courseService.createCourse(course, 1).subscribe(rs => {
      this.router.navigate(['/']).then()
    })
  }
}
