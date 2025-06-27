import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../service/course.service";
import {PageCourse} from "../../model/pageCourse";
import {Course} from "../../model/course";
import {LessonService} from "../../service/lesson.service";
import {PageLesson} from "../../model/pageLesson";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  pageCourse?: PageCourse
  pageLesson?: PageLesson
  course?: Course
  sizeLessons = 0

  constructor(private courseService: CourseService,
              private lessonService: LessonService) {
  }

  ngOnInit(): void {
    this.getAllCourse(0, 10);
  }

  getAllCourse(page: any, size: any) {
    this.courseService.getAllCourse(page, size, "").subscribe(rs => {
      this.pageCourse = rs;
    })
  }

  getDetailCourse(idCourse: any) {
    this.courseService.getDetailCourse(idCourse).subscribe(rs => {
      this.course = rs
      this.getAllLessonByCourse(0, 10, this.course?.id, "")
    })
  }

  getAllLessonByCourse(page: any, size: any, idCourse: any, searchText: string) {
    this.lessonService.getAllLessonByCourse(page, size, idCourse, searchText).subscribe(rs => {
      this.pageLesson = rs
      if (this.pageLesson?.content != null) {
        this.sizeLessons = this.pageLesson?.content?.length
      }
    })
  }
}
