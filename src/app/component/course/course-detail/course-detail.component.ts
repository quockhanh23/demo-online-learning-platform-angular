import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../service/course.service";
import {Course} from "../../../model/course";
import {ActivatedRoute} from "@angular/router";
import {LessonService} from "../../../service/lesson.service";
import {Lesson} from "../../../model/lesson";
import {UserService} from "../../../service/user.service";
import {UserDTO} from "../../../model/user-dto";
import {ReviewService} from "../../../service/review.service";
import {Review} from "../../../model/review";
import {AdminService} from "../../../service/admin.service";
import {PageUser} from "../../../model/page-user";
import {checkRole} from "../../../app.component";
import {SummaryService} from "../../../service/summary.service";
import {CompleteCourse} from "../../../model/complete-course";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course?: Course
  review?: Review
  userDTO?: UserDTO
  idCourse?: any
  value?: any
  sizeLessons = 0
  first3Item?: Lesson[]
  roles?: any
  rolesCheck?: any
  idUserLogin?: any
  isTeacher = false;
  isStudent = false;
  selected: any = -1
  chunks: any[] = [];
  pageUser?: PageUser
  userDTOs?: UserDTO[]
  completeCourses?: CompleteCourse[]
  completeCourse?: CompleteCourse

  constructor(private courseService: CourseService,
              private lessonService: LessonService,
              private reviewService: ReviewService,
              private userService: UserService,
              private summaryService: SummaryService,
              private adminService: AdminService,
              private activatedRoute: ActivatedRoute,) {
    this.idUserLogin = localStorage.getItem("idUser")
    this.roles = localStorage.getItem("roles")
    this.checkTeacher();
    this.rolesCheck = checkRole(this.roles)
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      this.idCourse = rs.get('id')
      this.checkCompleteCourse();
    })
    this.getDetailCourse(this.idCourse)
    this.courseService.checkRegister(this.idCourse, this.idUserLogin).subscribe(rs => {
      this.value = rs.value
    })
    this.reviewService.getDetailReview(this.idCourse, this.idUserLogin).subscribe(rs => {
      this.review = rs
    })
  }

  checkCompleteCourse() {
    this.summaryService.checkCompleteCourse(this.idUserLogin).subscribe(rs => {
      this.completeCourses = rs
      if (this.completeCourses != null) {
        for (let i = 0; i < this.completeCourses.length; i++) {
          if (this.idCourse == this.completeCourses[i].idCourse) {
            this.completeCourse = this.completeCourses[i]
            break
          }
        }
      }
    })
  }

  scrollTo() {
    const el = document.getElementById('sectionCourse');
    el?.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  getStarValue(value: any) {
    this.selected = value;
    console.log("selected: " + value)
    this.getDetailReview(value);
  }

  getDetailReview(value: any) {
    this.reviewService.getDetailReview(this.idCourse, this.idUserLogin).subscribe(rs => {
      this.review = rs
      if (this.review == null) {
        this.createReview(value)
      }
    })
  }

  createReview(selected: number) {
    if (selected != -1) {
      let review = {
        starLevel: this.selected,
        idCourse: this.idCourse,
        idUserAction: this.idUserLogin
      }
      this.reviewService.createReview(review).subscribe(() => {
        this.getDetailCourse(this.idCourse)
      })
    }
  }

  getAllUserByDepartment(idDepartment: any) {
    if (idDepartment == null) return
    this.adminService.getAllUserByDepartment(0, 6, idDepartment, this.idUserLogin).subscribe(rs => {
      this.pageUser = rs;
      this.userDTOs = this.pageUser?.content;
    })
  }

  getDetailCourse(idCourse: any) {
    this.courseService.getDetailCourse(idCourse).subscribe(rs => {
      this.course = rs
      this.getAllUserByDepartment(this.course?.idDepartment)
      this.getAllLessonByCourse(0, 10, this.course?.id)
      this.userService.getDetailUser(this.course?.idUser).subscribe(rs => {
        this.userDTO = rs
      })
    })
  }

  checkTeacher() {
    if (this.roles != null) {
      let role: string = JSON.stringify(this.roles);
      let indexTeacher = role.indexOf("TEACHER");
      this.isTeacher = indexTeacher > 0;
      let indexStudent = role.indexOf("STUDENT");
      this.isStudent = indexStudent > 0;
    }
  }

  courseRegister() {
    if (this.idUserLogin == null) return
    this.courseService.registerCourse(this.idCourse, this.idUserLogin).subscribe(() => {
      this.courseService.checkRegister(this.idCourse, this.idUserLogin).subscribe(rs => {
        this.value = rs.value
      })
    })
  }

  getAllLessonByCourse(page: any, size: any, idCourse: any) {
    const searchLesson = (document.getElementById("searchLesson") as HTMLSelectElement).value;

    this.first3Item = [];
    this.chunks = [];

    this.lessonService.getAllLessonByCourseList(idCourse, searchLesson).subscribe(rs => {
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
}
