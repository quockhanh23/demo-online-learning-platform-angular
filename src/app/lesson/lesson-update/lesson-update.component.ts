import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LessonService} from "../../service/lesson.service";
import {UploadService} from "../../service/upload-service.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Lesson} from "../../model/lesson";

@Component({
  selector: 'app-lesson-update',
  templateUrl: './lesson-update.component.html',
  styleUrls: ['./lesson-update.component.css']
})
export class LessonUpdateComponent implements OnInit {

  idLesson: any
  video: SafeResourceUrl = ''
  checkHaveVideo = false;
  lesson?: Lesson
  idUserLogin?: any

  lessonForm: FormGroup = this.formBuilder.group({
    lessonName: new FormControl(''),
  });

  constructor(private lessonService: LessonService,
              private uploadService: UploadService,
              private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private formBuilder: FormBuilder) {
    this.idUserLogin = localStorage.getItem("idUser")
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      this.idLesson = rs.get('id')
    })
  }

  updateLesson() {
    let lesson = {
      lessonName: this.lessonForm.value.lessonName,
      id: this.idLesson
    }
    this.lessonService.updateLesson(lesson, this.idUserLogin).subscribe(rs => {
      this.lesson = rs
      this.checkHaveVideo = false;
    })
  }
}
