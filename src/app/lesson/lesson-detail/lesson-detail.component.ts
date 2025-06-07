import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LessonService} from "../../service/lesson.service";
import {Lesson} from "../../model/lesson";

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {

  idLesson?: any
  lesson?: Lesson

  constructor(private lessonService: LessonService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      this.idLesson = rs.get('id')
    })
    this.lessonService.getDetailLesson(this.idLesson).subscribe(rs => {
      this.lesson = rs
    })
  }

}
