import {Component, OnInit} from '@angular/core';
import {LessonService} from "../../service/lesson.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Lesson} from "../../model/lesson";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.css']
})
export class LessonCreateComponent implements OnInit {

  idCourse: any
  selectedFile: File | null = null;
  sourceUpload: boolean = false;
  sourceUrl: boolean = false;

  lessonForm: FormGroup = this.formBuilder.group({
    lessonName: new FormControl(''),
  });

  constructor(private lessonService: LessonService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      this.idCourse = rs.get('id')
    })
  }

  createLesson() {
    let lesson: Lesson = this.lessonForm;
    lesson.idCourse = this.idCourse
    this.lessonService.createLesson(lesson).subscribe(() => {
      this.router.navigate(['/']).then()
    })
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadVideo() {

  }

  toSourceUpload() {
    this.sourceUpload = true;
    this.sourceUrl = false;
  }

  toSourceUrl() {
    this.sourceUpload = false;
    this.sourceUrl = true;
  }
}
