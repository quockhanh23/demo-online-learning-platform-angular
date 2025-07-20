import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../service/course.service";
import {Course} from "../../model/course";
import {ActivatedRoute} from "@angular/router";
import {LessonService} from "../../service/lesson.service";
import {Lesson} from "../../model/lesson";
import {PageLesson} from "../../model/pageLesson";
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
  pageLesson?: PageLesson
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
    this.lessonService.getAllLessonByCourse(page, size, idCourse, searchLesson).subscribe(rs => {
      this.pageLesson = rs
      if (this.pageLesson?.content != null) {
        this.sizeLessons = this.pageLesson?.content?.length
        if (this.sizeLessons >= 3) {
          this.first3Item = [this.pageLesson?.content[0], this.pageLesson?.content[1], this.pageLesson?.content[2]];
        } else {
          this.first3Item = this.pageLesson?.content
        }
        if (this.sizeLessons >= 4) {
          this.items = this.pageLesson?.content?.slice(3);
        }
      }
    })
  }
}
