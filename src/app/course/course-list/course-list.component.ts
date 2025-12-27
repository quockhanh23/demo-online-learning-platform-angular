import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../service/course.service";
import {PageCourse} from "../../model/pageCourse";
import {Course} from "../../model/course";
import {LessonService} from "../../service/lesson.service";
import {Lesson} from "../../model/lesson";
import {checkRole} from "../../app.component";
import {AdminService} from "../../service/admin.service";
import {PageUser} from "../../model/page-user";
import {UserDTO} from "../../model/user-dto";
import {CompleteCourse} from "../../model/complete-course";
import {SummaryService} from "../../service/summary.service";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  pageCourse?: PageCourse
  course?: Course
  sizeLessons = 0
  first3Item?: Lesson[]
  currentPage?: number = 0;
  currentPageAddOne?: number = 1;
  previousPageNumber?: number = 1;
  currentNumber?: number = 2;
  nextPageNumber?: number = 3;
  size?: number = 0;
  roles?: any
  idUserLogin?: any
  role?: any
  chunks: any[] = [];
  pageUser?: PageUser
  userDTOs?: UserDTO[]
  completeCourses?: CompleteCourse[]
  completeCourse?: CompleteCourse

  constructor(private courseService: CourseService,
              private adminService: AdminService,
              private summaryService: SummaryService,
              private lessonService: LessonService) {
    this.roles = localStorage.getItem("roles")
    this.idUserLogin = localStorage.getItem("idUser")
  }

  ngOnInit(): void {
    this.getAllCourse(0, 8);
    this.role = checkRole(this.roles)
    this.getAllUserByRole()
  }

  checkCompleteCourse(course: any) {
    this.summaryService.checkCompleteCourse(this.idUserLogin).subscribe(rs => {
      this.completeCourses = rs
      if (this.completeCourses != null) {
        for (let i = 0; i < this.completeCourses.length; i++) {
          if (course?.id == this.completeCourses[i].idCourse) {
            this.completeCourse = this.completeCourses[i]
            break
          }
        }
      }
    })
  }

  scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  getAllUserByRole() {
    this.adminService.getAllUserByRole(this.currentPage, 6, "TEACHER", this.idUserLogin).subscribe(rs => {
      this.pageUser = rs;
      this.userDTOs = this.pageUser?.content;
      this.size = this.pageUser?.content?.length
    })
  }

  getAllCourse(page: any, size: any) {
    let search = (document.getElementById("search") as HTMLSelectElement).value
    if (search == null) search = ""
    this.courseService.getAllCourse(page, size, search).subscribe(rs => {
      this.pageCourse = rs;
      this.size = this.pageCourse.content?.length
    })
  }

  getDetailCourse(idCourse: any) {
    this.courseService.getDetailCourse(idCourse).subscribe(rs => {
      this.course = rs
      this.getAllLessonByCourse(0, 8, this.course?.id, "")
      this.completeCourse = undefined
      this.checkCompleteCourse(this.course)
    })
  }

  getAllLessonByCourse(page: any, size: any, idCourse: any, searchText: string) {
    this.first3Item = []
    this.lessonService.getAllLessonByCourseList(idCourse, searchText).subscribe(rs => {
      this.sizeLessons = rs?.length;
      if (rs.length >= 3) {
        this.first3Item = [rs[0], rs[1], rs[2]];
      } else {
        this.first3Item = rs;
        return;
      }
      const remain = rs.slice(3);
      for (let i = 0; i < remain.length; i += 3) {
        this.chunks.push(remain.slice(i, i + 3));
      }
    });
  }

  previousPage() {
    if (this.currentPage != null && this.currentPage > 0) {
      this.currentPage--;
      this.currentPageAddOne = this.currentPage + 1
      this.getAllCourse(this.currentPage, 8);
      this.scrollToTop()
      if (this.currentPage == 0 || this.currentPage == 1) {
        this.currentNumber = 2
        this.previousPageNumber = 1
        this.nextPageNumber = 3
      } else {
        this.currentNumber = this.currentPage + 1
        this.previousPageNumber = this.currentPage
        this.nextPageNumber = this.currentPage + 2
      }
    }
  }

  nextPage() {
    if (this.pageCourse?.content == null || this.pageCourse?.content.length == 0) return
    if (this.currentPage != null && (this.currentPage + 1)
      // @ts-ignore
      * this.pageCourse?.page?.number < this.pageCourse?.page?.totalElements) {
      this.currentPage++;
      this.currentPageAddOne = this.currentPage + 1
      this.getAllCourse(this.currentPage, 8);
      this.scrollToTop()
      this.currentNumber = this.currentPage + 1
      this.previousPageNumber = this.currentPage
      this.nextPageNumber = this.currentPage + 2
    }
  }
}
