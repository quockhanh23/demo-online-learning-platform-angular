import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../service/course.service";
import {PageCourse} from "../../model/pageCourse";
import {Course} from "../../model/course";
import {LessonService} from "../../service/lesson.service";
import {PageLesson} from "../../model/pageLesson";
import {Lesson} from "../../model/lesson";

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
  first3Item?: Lesson[]
  items?: Lesson[]

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
    this.first3Item = []
    this.items = []
    this.lessonService.getAllLessonByCourse(page, size, idCourse, searchText).subscribe(rs => {
      this.pageLesson = rs
      if (this.pageLesson?.content != null) {
        this.sizeLessons = this.pageLesson?.content?.length
        if (this.sizeLessons >= 3) {
          this.first3Item = [this.pageLesson?.content[0], this.pageLesson?.content[1], this.pageLesson?.content[2]];
        }
        if (this.sizeLessons >= 4) {
          this.items = this.pageLesson?.content?.slice(3);
        }
      }
    })
  }
}
