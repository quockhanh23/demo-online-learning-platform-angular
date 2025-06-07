import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../service/course.service";
import {Course} from "../../model/course";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course?: Course
  idCourse?: any

  constructor(private courseService: CourseService,
              private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      this.idCourse = rs.get('id')
    })
    this.courseService.getDetailCourse(this.idCourse).subscribe(rs => {
      this.course = rs
    })
  }
}
