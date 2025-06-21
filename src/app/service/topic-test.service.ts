import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TopicTestDTO} from "../model/topic-test-d-t-o";
import {MultipleChoiceQuestion} from "../model/multiple-choice-question";
import {EssayQuestion} from "../model/essay-question";

const API_URL = "http://localhost:8080/api/topicTests"

@Injectable({
  providedIn: 'root'
})
export class TopicTestService {

  constructor(private http: HttpClient) {
  }

  getDetailTopicTestByCourse(idCourse: any): Observable<TopicTestDTO[]> {
    return this.http.get<TopicTestDTO[]>(API_URL + `/getDetailTopicTestByCourse?idCourse=${idCourse}`,)
  }

  getDetailTopicTestByLesson(idLesson: any): Observable<TopicTestDTO> {
    return this.http.get<TopicTestDTO>(API_URL + `/getDetailTopicTestByLesson?idLesson=${idLesson}`,)
  }

  findById(idTopicTest: any): Observable<TopicTestDTO> {
    return this.http.get<TopicTestDTO>(API_URL + `/findById?idTopicTest=${idTopicTest}`,)
  }

  getMultipleChoiceQuestion(idTopicTest: any): Observable<MultipleChoiceQuestion[]> {
    return this.http.get<MultipleChoiceQuestion[]>(API_URL + `/getMultipleChoiceQuestion?idTopicTest=${idTopicTest}`,)
  }

  getEssayQuestion(idTopicTest: any): Observable<EssayQuestion[]> {
    return this.http.get<EssayQuestion[]>(API_URL + `/getEssayQuestion?idTopicTest=${idTopicTest}`,)
  }

  createTopicTest(test: any): Observable<any> {
    return this.http.post<any>(API_URL + `/createTopicTest`, test, {
      headers: {
        Authorization: `Bearer ${""}`,
      }
    })
  }

  updateTopicTest(test: any): Observable<TopicTestDTO> {
    return this.http.put<TopicTestDTO>(API_URL + `/updateTopicTest`, test, {
      headers: {
        Authorization: `Bearer ${""}`,
      }
    })
  }

  updateStatusTopicTest(status: any, idTopicTest: string): Observable<any> {
    return this.http.put<any>(API_URL + `/updateStatusTopicTest?status=${status}&idTopicTest=${idTopicTest}`, {
      headers: {
        Authorization: `Bearer ${""}`,
      }
    })
  }

  createMultipleChoiceQuestion(questions: MultipleChoiceQuestion[]): Observable<any> {
    return this.http.post<any>(API_URL + `/createMultipleChoiceQuestion`, questions, {
      headers: {
        Authorization: `Bearer ${""}`,
      }
    })
  }

  createEssayQuestion(questions: EssayQuestion[]): Observable<any> {
    return this.http.post<any>(API_URL + `/createEssayQuestion`, questions, {
      headers: {
        Authorization: `Bearer ${""}`,
      }
    })
  }
}
