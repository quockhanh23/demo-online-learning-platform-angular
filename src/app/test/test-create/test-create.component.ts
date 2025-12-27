import {Component, HostListener, OnInit} from '@angular/core';
import {TestService} from "../../service/test.service";
import {TopicTestService} from "../../service/topic-test.service";
import {UserService} from "../../service/user.service";
import {TopicTestDTO} from "../../model/topic-test-d-t-o";
import {Test} from "../../model/test";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MultipleChoiceAnswer} from "../../model/multiple-choice-answer";
import {EssayAnswer} from "../../model/essay-answer";
import {EssayQuestion} from "../../model/essay-question";
import {MultipleChoiceQuestion} from "../../model/multiple-choice-question";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDTO} from "../../model/user-dto";

@Component({
  selector: 'app-test-create',
  templateUrl: './test-create.component.html',
  styleUrls: ['./test-create.component.css']
})
export class TestCreateComponent implements OnInit {

  message: string | undefined
  topicTestDTO?: TopicTestDTO
  test?: Test
  idTest?: any
  idUser?: any
  idLesson?: any
  multipleChoiceAnswers: MultipleChoiceAnswer[] | undefined
  essayAnswers: EssayAnswer[] | undefined
  multipleChoiceQuestionList: MultipleChoiceQuestion[] | undefined
  essayQuestionList: EssayQuestion[] | undefined
  user?: UserDTO
  myForm: FormGroup;
  display: any;

  constructor(private testService: TestService,
              private topicTestService: TopicTestService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,) {
    this.myForm = this.formBuilder.group({
      items: this.formBuilder.array([]),
      essayQuestions: this.formBuilder.array([])
    });
    this.idUser = localStorage.getItem("idUser")
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    // Gọi API lưu trạng thái, đóng WebSocket, v.v...
    console.log('Trình duyệt đang được đóng hoặc reload.');
    // Optionally hiển thị cảnh báo:
    event.preventDefault();

    this.updateTime();
    // @ts-ignore
    return (event.returnValue = 'Bạn có chắc chắn muốn rời khỏi trang này?');
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      this.idLesson = rs.get('idLesson')
    })
    this.getDetailTopicTest()
  }

  updateTime() {
    let value = this.display.split(":")[0]
    this.testService.updateTime(this.idTest, value).subscribe(() => {
    })
  }

  createMultipleChoiceAnswer() {
    if (this.multipleChoiceAnswers == null) return
    this.testService.createMultipleChoiceAnswer(this.multipleChoiceAnswers).subscribe(() => {
    })
  }

  createEssayAnswer() {
    if (this.essayAnswers == null) return
    this.testService.createEssayAnswer(this.essayAnswers).subscribe(() => {
    })
  }

  getDetailTopicTest() {
    if (this.idLesson == null) return
    this.topicTestService.getDetailTopicTestByLesson(this.idLesson).subscribe(rsTopicTest => {
      this.topicTestDTO = rsTopicTest
      this.userService.getDetailUser(this.idUser).subscribe(rsUser => {
        this.user = rsUser;
        let test = {
          idLesson: this.idLesson,
          idStudent: this.idUser,
          studentName: this.user?.fullName,
          idTopicTest: this.topicTestDTO?.id
        }
        this.testService.createTest(test).subscribe(rsTest => {
          this.idTest = rsTest?.id
          this.timer(1)
          if (this.topicTestDTO != null) {
            this.multipleChoiceQuestionList = this.topicTestDTO.multipleChoiceQuestionList
            this.essayQuestionList = this.topicTestDTO.essayQuestionList
            if (this.multipleChoiceQuestionList != null) {
              for (let i = 0; i < this.multipleChoiceQuestionList?.length; i++) {
                this.addItemMultipleChoiceQuestions(this.multipleChoiceQuestionList[i], rsTest);
              }
            }
            if (this.essayQuestionList != null) {
              for (let i = 0; i < this.essayQuestionList?.length; i++) {
                this.addItemEssayQuestion(this.essayQuestionList[i], test);
              }
            }
          }
        }, error => {
          this.message = error.error.message
        })
      })
    })
  }

  addItemMultipleChoiceQuestions(multipleChoiceQuestion: MultipleChoiceQuestion, test: Test) {
    const itemGroup = this.formBuilder.group({
      questionNumber: [multipleChoiceQuestion?.questionNumber, Validators.required],
      content: [multipleChoiceQuestion?.content, Validators.required],
      answer1: [multipleChoiceQuestion?.answer1, Validators.required],
      answer2: [multipleChoiceQuestion?.answer2, Validators.required],
      answer3: [multipleChoiceQuestion?.answer3, Validators.required],
      answer4: [multipleChoiceQuestion?.answer4, Validators.required],
      idLesson: this.idLesson,
      idStudent: this.idUser,
      idTest: test?.id,
      idTopicTest: this.topicTestDTO?.id,
      idMultipleChoiceQuestion: multipleChoiceQuestion?.id,
      answer: []
    });
    this.items.push(itemGroup);
  }

  addItemEssayQuestion(essayQuestion: EssayQuestion, test: Test) {
    const itemGroup = this.formBuilder.group({
      questionNumber: [essayQuestion?.questionNumber, Validators.required],
      content: [essayQuestion?.content, Validators.required],
      idLesson: this.idLesson,
      idStudent: this.idUser,
      idTest: test?.id,
      idTopicTest: this.topicTestDTO?.id,
      idMultipleChoiceQuestion: essayQuestion?.id,
      answerEssay: []
    });
    this.essayQuestions.push(itemGroup);
  }

  get items(): FormArray {
    // @ts-ignore
    return this.myForm.get('items') as FormArray;
  }

  get essayQuestions(): FormArray {
    // @ts-ignore
    return this.myForm.get('essayQuestions') as FormArray;
  }

  onSubmit() {
    this.multipleChoiceAnswers = this.myForm.value.items
    this.essayAnswers = this.myForm.value.essayQuestions
    this.createMultipleChoiceAnswer()
    this.createEssayAnswer()
  }

  changeToDetailLessonPage() {
    setTimeout(() => {
      this.router.navigate(['/detailLesson', this.idLesson]).then(rs => {
        console.log("navigate: " + rs)
      })
    }, 2000);
  }

  timer(minute: number) {
    console.log(minute);
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      console.log("this.display : " + this.display);
      if (seconds == 0) {
        console.log("finished");
        clearInterval(timer);
        this.onSubmit()
      }
    }, 1000);
  }
}
