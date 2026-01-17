import {Component, OnDestroy, OnInit} from '@angular/core';
import {DepartmentService} from "../../service/department.service";
import {PageDepartment} from "../../model/page-department";
import {Department} from "../../model/department";
import {PageCourse} from "../../model/pageCourse";
import {Course} from "../../model/course";
import {CourseService} from "../../service/course.service";
import {LessonService} from "../../service/lesson.service";
import {Lesson} from "../../model/lesson";

@Component({
  selector: 'app-lesson-plan',
  templateUrl: './lesson-plan.component.html',
  styleUrls: ['./lesson-plan.component.css']
})
export class LessonPlanComponent implements OnInit, OnDestroy {

  idUserLogin?: any
  size: number | undefined = 0
  height = "height: 500px"
  pageDepartment?: PageDepartment
  departments?: Department[]
  selectedDepartment: any;
  pageCourse?: PageCourse
  course?: Course
  idDepartment?: any
  idCourse?: any
  lessons?: Lesson[]

  constructor(private departmentService: DepartmentService,
              private lessonService: LessonService,
              private courseService: CourseService) {
    this.idUserLogin = localStorage.getItem("idUser")
    let beforeUrl = window.location.pathname;
    localStorage.setItem("beforeUrl", beforeUrl)
  }

  ngOnInit(): void {
    this.getAllDepartment(0, 30);
  }

  selectDepartment(de: any) {
    this.selectedDepartment = de;
    this.idDepartment = de?.id
    console.log("this.idDepartment: " + this.idDepartment)
  }

  getAllDepartment(page: any, size: any) {
    this.departmentService.getAllDepartment(this.idUserLogin, page, size, "", "").subscribe(rs => {
      this.pageDepartment = rs;
      this.departments = this.pageDepartment?.content;
      if (this.departments && this.departments.length > 0) {
        this.selectedDepartment = this.departments[0];
        this.idDepartment = this.departments[0]?.id
      }
    })
  }

  getAllCourseByDepartment(page: any, size: any) {
    console.log("this.idDepartment: " + this.idDepartment)
    if (this.idDepartment == null) return
    this.courseService.getAllCourseByDepartment(page, size, "", this.idDepartment).subscribe(rs => {
      this.pageCourse = rs;
      this.size = this.pageCourse.content?.length
      if (this.size != null) {
        if (this.size <= 2) {
          this.height = "height: 500px"
        } else if (this.size < 5 && this.size > 2) {
          this.height = "height: 200px"
        } else {
          this.height = ""
        }
      } else {
        this.height = "height: 500px"
      }
      console.log("this.height: " + this.height)
    })
  }

  getAllLessonByCourse(idCourse: any) {
    console.log("this.idCourse: " + idCourse)
    if (idCourse == null) return
    this.lessonService.getAllLessonByCourseList(idCourse, "").subscribe(rs => {
      this.lessons = rs
    });
  }

  ngOnDestroy(): void {
    localStorage.removeItem("beforeUrl")
  }
}
