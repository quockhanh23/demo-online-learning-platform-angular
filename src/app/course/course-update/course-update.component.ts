import {Component, OnInit} from '@angular/core';
import {Course} from "../../model/course";
import {Lesson} from "../../model/lesson";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CourseService} from "../../service/course.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.css']
})
export class CourseUpdateComponent implements OnInit {

  course?: Course
  idCourse?: any
  value?: any
  items?: Lesson[]
  roles?: any
  idUserLogin?: any

  courseForm: FormGroup = this.formBuilder.group({
    courseName: new FormControl(''),
    courseDescription: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });

  constructor(private courseService: CourseService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) {
    this.idUserLogin = localStorage.getItem("idUser")
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      this.idCourse = rs.get('id')
    })
    this.getDetailCourse(this.idCourse);
  }

  getDetailCourse(idCourse: any) {
    this.courseService.getDetailCourse(idCourse).subscribe(rs => {
      this.course = rs
    })
  }

  updateCourse() {
    let course: Course = {
      id: this.course?.id,
      courseName: this.courseForm.value.courseName,
      courseDescription: this.courseForm.value.courseDescription,
      startDate: this.courseForm.value.startDate,
      endDate: this.courseForm.value.endDate,
    };
    this.courseService.updateCourse(course, this.idUserLogin).subscribe(rs => {
      this.course = rs
    })
  }
}
