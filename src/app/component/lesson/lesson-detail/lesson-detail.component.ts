import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LessonService} from "../../../service/lesson.service";
import {Lesson} from "../../../model/lesson";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {TestService} from "../../../service/test.service";
import {TestDTO} from "../../../model/test-dto";
import {TopicTestService} from "../../../service/topic-test.service";
import {ReviewResultsService} from "../../../service/review-results.service";
import {ReviewResults} from "../../../model/review-results";
import {Test} from "../../../model/test";
import {SummaryService} from "../../../service/summary.service";
import {LessonCompletion} from "../../../model/lesson-completion";

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {

  idLesson?: any
  idUser?: any
  lesson?: Lesson
  videoUrl!: SafeResourceUrl;
  show = false;
  testDTOS?: TestDTO[]
  testDTO?: TestDTO
  test?: Test
  open = false;
  results?: ReviewResults
  closeResult = false;
  roles?: any
  isTeacher = false;
  isStudent = false;
  lessonCompletion?: LessonCompletion

  constructor(private lessonService: LessonService,
              private sanitizer: DomSanitizer,
              private testService: TestService,
              private summaryService: SummaryService,
              private resultsService: ReviewResultsService,
              private topicTestService: TopicTestService,
              private activatedRoute: ActivatedRoute) {
    this.idUser = localStorage.getItem("idUser")
    this.roles = localStorage.getItem("roles")
    this.checkTeacher()
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      this.idLesson = rs.get('id')
    })
    this.lessonService.getDetailLesson(this.idLesson).subscribe(rs => {
      this.lesson = rs
      if (this.lesson?.sourceUrl != null) {
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.lesson?.sourceUrl);
      }
    })
    this.highestPointLesson();
    this.checkCompleteLesson();
  }

  checkCompleteLesson() {
    this.summaryService.checkCompleteLesson(this.idUser, this.idLesson).subscribe(rs => {
      this.lessonCompletion = rs
    })
  }

  scrollToBottom() {
    window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
  }

  getDetailTestByUserAndLesson() {
    if (this.idUser == null) return;
    this.testService.getDetailTestByUserAndLesson(this.idUser, this.idLesson).subscribe(rs => {
      this.testDTOS = rs
    })
  }

  getDetailTest(testDTO: TestDTO) {
    this.testDTO = testDTO
    this.getReviewResults(testDTO?.id, this.idLesson);
    this.open = true;
    this.closeResult = false;
  }

  getReviewResults(idTest: any, idLesson: any) {
    this.resultsService.getReviewResults(idTest, idLesson).subscribe(rs => {
      this.results = rs
    })
  }

  close() {
    this.closeResult = true;
    this.open = false;
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

  highestPointLesson() {
    this.lessonService.highestPointLesson(this.idLesson, this.idUser).subscribe(rs => {
        this.test = rs;
      }
    )
  }
}
