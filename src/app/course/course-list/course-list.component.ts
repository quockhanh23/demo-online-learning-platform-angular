import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../service/course.service";
import {PageCourse} from "../../model/pageCourse";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  pageCourse?: PageCourse

  constructor(private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.getAllCourse(0, 10);
  }

  getAllCourse(page: any, size: any) {
    this.courseService.getAllCourse(page, size, "").subscribe(rs => {
      this.pageCourse = rs;
    })
  }
}
