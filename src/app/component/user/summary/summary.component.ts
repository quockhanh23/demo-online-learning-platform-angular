import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../../../service/course.service";
import {LessonService} from "../../../service/lesson.service";
import {Course} from "../../../model/course";
import {Summary} from "../../../model/summary";
import {SummaryService} from "../../../service/summary.service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  title = "Điểm môn học"
  idUserLogin?: any
  courses?: Course[]
  summaries?: Summary[]
  idLesson?: any
  height = "height: "

  constructor(private userService: UserService,
              private courseService: CourseService,
              private summaryService: SummaryService,
              private lessonService: LessonService,
              private activatedRoute: ActivatedRoute) {
    this.idUserLogin = localStorage.getItem("idUser")
  }

  ngOnInit(): void {
    this.getAllRegisterCourse()
    this.courseSummary()
  }

  getAllRegisterCourse() {
    this.courseService.getAllRegisterCourse(this.idUserLogin).subscribe(rs => {
      this.courses = rs
    })
  }

  courseSummary() {
    this.summaryService.courseSummary(this.idUserLogin, 1, 1, 1).subscribe(rs => {
      this.summaries = rs
      if (this.summaries != null) {
        let px = 100;
        if (this.summaries.length <= 2) {
          let value = px + 300 * this.summaries.length
          this.height = this.height + value + 'px'
        }
        if (this.summaries.length <= 6 && this.summaries.length > 2) {
          let value = px + 200 * this.summaries.length
          this.height = this.height + value + 'px'
        }
        if (this.summaries.length > 6) {
          let value = px * this.summaries.length
          this.height = this.height + value + 'px'
        }
      }
    })
  }
}
