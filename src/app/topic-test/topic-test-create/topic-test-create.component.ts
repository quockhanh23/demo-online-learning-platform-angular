import {Component, OnInit} from '@angular/core';
import {TopicTestService} from "../../service/topic-test.service";
import {TopicTestDTO} from "../../model/topic-test-d-t-o";

@Component({
  selector: 'app-topic-test-create',
  templateUrl: './topic-test-create.component.html',
  styleUrls: ['./topic-test-create.component.css']
})
export class TopicTestCreateComponent implements OnInit {

  idTeacher?: string
  topicTestCreate?: TopicTestDTO
  topicTestUpdate?: TopicTestDTO

  constructor(private topicTestService: TopicTestService) {
  }

  ngOnInit(): void {
  }

  createTopicTest() {
    let topic = {
      idTeacher: this.idTeacher,
    }
    this.topicTestService.createTopicTest(topic).subscribe(rs => {

    })
  }

  updateTopicTest() {
    let topic = {
      idTeacher: this.idTeacher,
    }
    this.topicTestService.updateTopicTest(topic).subscribe(rs => {

    })
  }

}
