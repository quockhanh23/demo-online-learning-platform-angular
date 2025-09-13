import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../../service/course.service";
import {LessonService} from "../../service/lesson.service";
import {Course} from "../../model/course";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  idUserLogin?: any
  courses?: Course[]
  idLesson?: any

  constructor(private userService: UserService,
              private courseService: CourseService,
              private lessonService: LessonService,
              private activatedRoute: ActivatedRoute) {
    this.idUserLogin = localStorage.getItem("idUser")
  }

  ngOnInit(): void {
    this.getAllRegisterCourse()
  }

  getAllRegisterCourse() {
    this.courseService.getAllRegisterCourse(this.idUserLogin).subscribe(rs => {
      this.courses = rs
    })
  }


}
