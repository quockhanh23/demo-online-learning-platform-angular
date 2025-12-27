import {Component, OnInit} from '@angular/core';
import {LessonService} from "../../../service/lesson.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UploadService} from "../../../service/upload-service.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Lesson} from "../../../model/lesson";

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.css']
})
export class LessonCreateComponent implements OnInit {

  idCourse: any
  sourceUrl = ''
  video: SafeResourceUrl = ''
  checkUploadDone = true;
  checkHaveVideo = false;
  lesson?: Lesson

  lessonForm: FormGroup = this.formBuilder.group({
    lessonName: new FormControl(''),
  });

  constructor(private lessonService: LessonService,
              private uploadService: UploadService,
              private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      this.idCourse = rs.get('id')
    })
  }

  createLesson() {
    let lesson = {
      lessonName: this.lessonForm.value.lessonName,
      idCourse: this.idCourse,
      sourceUrl: this.sourceUrl
    }
    this.lessonService.createLesson(lesson, "1").subscribe(rs => {
      this.lesson = rs
      this.checkHaveVideo = false;
      this.router.navigate(['/detailLesson', this.lesson?.id]).then()
    })
  }

  onFileSelected(event: any) {
    this.checkUploadDone = false;
    this.sourceUrl = ""
    const file = event.target.files[0];
    if (file) {
      this.uploadService.getSignature().subscribe(signatureData => {
        this.uploadService.uploadVideo(file, signatureData).subscribe(
          res => {
            this.sourceUrl = res.secure_url
            console.log('Upload thành công:', res.secure_url);
            this.checkHaveVideo = true;
            this.checkUploadDone = true;
            if (this.sourceUrl != null) {
              this.video = this.sanitizer.bypassSecurityTrustResourceUrl(this.sourceUrl);
            }
          },
          err => {
            console.error('Upload thất bại', err);
          }
        );
      });
    }
  }
}
