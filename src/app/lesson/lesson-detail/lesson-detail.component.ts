import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LessonService} from "../../service/lesson.service";
import {Lesson} from "../../model/lesson";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {TestService} from "../../service/test.service";
import {TestDTO} from "../../model/test-dto";
import {TopicTestService} from "../../service/topic-test.service";
import {ReviewResultsService} from "../../service/review-results.service";

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {

  idLesson?: any
  lesson?: Lesson
  videoUrl!: SafeResourceUrl;
  show = false;
  testDTOS?: TestDTO[]
  testDTO?: TestDTO

  constructor(private lessonService: LessonService,
              private sanitizer: DomSanitizer,
              private testService: TestService,
              private resultsService: ReviewResultsService,
              private topicTestService: TopicTestService,
              private activatedRoute: ActivatedRoute) {
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
  }

  getDetailTestByUserAndLesson() {
    this.testService.getDetailTestByUserAndLesson("1", this.idLesson).subscribe(rs => {
      this.testDTOS = rs
    })
  }

  getDetailTest(testDTO: TestDTO) {
    this.testDTO = testDTO
    this.getReviewResults(testDTO?.id, this.idLesson);
  }

  getReviewResults(idTest: any, idLesson: any) {
    this.resultsService.getReviewResults(idTest, idLesson).subscribe()
  }
}
