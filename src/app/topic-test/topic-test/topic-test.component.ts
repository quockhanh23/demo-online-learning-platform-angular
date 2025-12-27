import {Component, OnInit} from '@angular/core';
import {TopicTestService} from "../../service/topic-test.service";
import {TopicTestDTO} from "../../model/topic-test-d-t-o";
import {EssayQuestion} from "../../model/essay-question";
import {MultipleChoiceQuestion} from "../../model/multiple-choice-question";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-topic-test',
  templateUrl: './topic-test.component.html',
  styleUrls: ['./topic-test.component.css']
})
export class TopicTestComponent implements OnInit {

  topicTest?: TopicTestDTO
  essayQuestions?: EssayQuestion[]
  multipleChoiceQuestions?: MultipleChoiceQuestion[]
  idTeacher?: any
  idLesson?: any
  idTopicTest?: any

  constructor(private topicTestService: TopicTestService,
              private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      this.idTopicTest = rs.get('id')
    })
    this.topicTestService.findById(25).subscribe(rs => {
      this.topicTest = rs
      console.log(JSON.stringify(this.topicTest))
      this.idTopicTest = this.topicTest?.id
      this.getMultipleChoiceQuestion();
      this.getEssayQuestion();
    })
  }

  getMultipleChoiceQuestion() {
    this.topicTestService.getMultipleChoiceQuestion(25).subscribe(rs => {
      this.multipleChoiceQuestions = rs
    })
  }

  getEssayQuestion() {
    this.topicTestService.getEssayQuestion(25).subscribe(rs => {
      this.essayQuestions = rs
    })
  }
}
