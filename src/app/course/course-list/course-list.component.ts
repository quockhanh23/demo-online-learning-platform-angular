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
  currentPage?: number = 0;
  currentPageAddOne?: number = 1;
  previousPageNumber?: number = 1;
  currentNumber?: number = 2;
  nextPageNumber?: number = 3;
  size?: number = 0;

  constructor(private courseService: CourseService,
              private lessonService: LessonService) {
  }

  ngOnInit(): void {
    this.getAllCourse(0, 8);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  previousPage() {
    if (this.currentPage != null && this.currentPage > 0) {
      this.currentPage--;
      this.currentPageAddOne = this.currentPage + 1
      this.getAllCourse(this.currentPage, 8);
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
      this.currentNumber = this.currentPage + 1
      this.previousPageNumber = this.currentPage
      this.nextPageNumber = this.currentPage + 2
    }
  }
}
