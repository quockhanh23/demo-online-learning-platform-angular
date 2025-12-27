import {Component, OnInit} from '@angular/core';
import {TopicTestService} from "../../../service/topic-test.service";
import {TopicTestDTO} from "../../../model/topic-test-d-t-o";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EssayQuestion} from "../../../model/essay-question";
import {MultipleChoiceQuestion} from "../../../model/multiple-choice-question";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-topic-test-create',
  templateUrl: './topic-test-create.component.html',
  styleUrls: ['./topic-test-create.component.css']
})
export class TopicTestCreateComponent implements OnInit {

  idTeacher?: any
  idLesson?: any
  idTopicTest?: any
  topicTestCreate?: TopicTestDTO
  topicTest?: TopicTestDTO
  topicTestUpdate?: TopicTestDTO
  myForm: FormGroup;
  essayQuestions?: EssayQuestion[]
  multipleChoiceQuestions?: MultipleChoiceQuestion[]
  submit = false;

  topicForm: FormGroup = this.fb.group({
    testName: new FormControl(''),
    type: new FormControl(''),
    startDate: new FormControl(''),
  });

  constructor(private topicTestService: TopicTestService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
    this.idTeacher = localStorage.getItem("idUser")
    this.myForm = this.fb.group({
      items: this.fb.array([]),
      items2: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      this.idLesson = rs.get('idLesson')
    })
    this.topicTestService.getDetailTopicTestByLesson(1).subscribe(rs => {
      this.topicTest = rs
      if (this.topicTest?.status != 'COMPLETE') {
        this.topicTestCreate = rs
        this.idTopicTest = this.topicTestCreate?.id
        this.addItem(this.idTopicTest);
        this.addItem2(this.idTopicTest);
      }
    })
  }

  get items(): FormArray {
    return this.myForm.get('items') as FormArray;
  }

  get items2(): FormArray {
    return this.myForm.get('items2') as FormArray;
  }

  addItem(idTopicTest: string) {
    const itemGroup = this.fb.group({
      questionNumber: this.items.length + 1,
      content: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      answer3: ['', Validators.required],
      answer4: ['', Validators.required],
      correctAnswer: ['', Validators.required],
      idLesson: this.idLesson,
      idTopicTest: idTopicTest
    });
    console.log(JSON.stringify(this.myForm.value.items))
    this.items.push(itemGroup);
  }

  addItem2(idTopicTest: string) {
    const itemGroup = this.fb.group({
      content: ['', Validators.required],
      idLesson: this.idLesson,
      idTopicTest: idTopicTest
    });
    console.log(JSON.stringify(this.myForm.value.items2))
    this.items2.push(itemGroup);
  }

  onSubmit() {
    this.multipleChoiceQuestions = this.myForm.value.items
    this.essayQuestions = this.myForm.value.items2
    this.createMultipleChoiceQuestion();
    this.createEssayQuestion();
    this.topicTestService.updateStatusTopicTest("COMPLETE", this.idTopicTest).subscribe(rs => {
      this.topicTestUpdate = rs
      this.submit = true;
    })
  }

  createMultipleChoiceQuestion() {
    if (this.multipleChoiceQuestions == null) return
    this.topicTestService.createMultipleChoiceQuestion(this.multipleChoiceQuestions).subscribe(() => {
    })
  }

  createEssayQuestion() {
    if (this.essayQuestions == null) return
    this.topicTestService.createEssayQuestion(this.essayQuestions).subscribe(() => {
    })
  }

  createTopicTest() {
    let topic = {
      testName: this.topicForm.value.testName,
      type: this.topicForm.value.type,
      idTeacher: this.idTeacher,
      idLesson: this.idLesson,
    }
    this.topicTestService.createTopicTest(topic).subscribe(rs => {
      this.topicTestCreate = rs
      this.idTopicTest = this.topicTestCreate?.id
      this.addItem(this.idTopicTest);
      this.addItem2(this.idTopicTest);
    })
  }

  updateTopicTest() {
    let topic = {
      idTeacher: this.idTeacher,
    }
    this.topicTestService.updateTopicTest(topic).subscribe(rs => {
      this.topicTestUpdate = rs
    })
  }

}
