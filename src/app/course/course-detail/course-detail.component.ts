import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../service/course.service";
import {Course} from "../../model/course";
import {ActivatedRoute} from "@angular/router";
import {LessonService} from "../../service/lesson.service";
import {Lesson} from "../../model/lesson";
import {UserService} from "../../service/user.service";
import {UserDTO} from "../../model/user-dto";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course?: Course
  userDTO?: UserDTO
  idCourse?: any
  value?: any
  sizeLessons = 0
  first3Item?: Lesson[]
  items?: Lesson[]
  role?: any

  constructor(private courseService: CourseService,
              private lessonService: LessonService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      this.idCourse = rs.get('id')
    })
    this.courseService.getDetailCourse(this.idCourse).subscribe(rs => {
      this.course = rs
      this.getAllLessonByCourse(0, 10, this.course?.id)
      this.userService.getDetailUser(this.course?.idUser).subscribe(rs => {
        this.userDTO = rs
      })
    })
    this.courseService.checkRegister(this.idCourse, 1).subscribe(rs => {
      this.value = rs.value
      console.log("this.value: " + this.value)
    })
  }

  courseRegister() {
    this.courseService.registerCourse(this.idCourse, 1).subscribe(() => {
      this.courseService.checkRegister(this.idCourse, 1).subscribe(rs => {
        this.value = rs.value
      })
    })
  }

  getAllLessonByCourse(page: any, size: any, idCourse: any) {
    let searchLesson = (document.getElementById("searchLesson") as HTMLSelectElement).value
    this.first3Item = []
    this.items = []
    this.lessonService.getAllLessonByCourseList(idCourse, searchLesson).subscribe(rs => {
      this.sizeLessons = rs?.length
      if (this.sizeLessons >= 3) {
        this.first3Item = [rs[0], rs[1], rs[2]];
      } else {
        this.first3Item = rs
      }
      if (this.sizeLessons >= 4) {
        this.items = rs.slice(3);
      }
    })
  }
}
