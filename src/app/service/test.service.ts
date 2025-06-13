import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Test} from "../model/test";
import {MultipleChoiceAnswer} from "../model/multiple-choice-answer";
import {EssayAnswer} from "../model/essay-answer";

const API_URL = "http://localhost:8080/api/tests"

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) {
  }

  createTest(test: Test): Observable<any> {
    return this.http.post<any>(API_URL + `/createTest`, test, {
      headers: {
        Authorization: `Bearer ${""}`,
      }
    })
  }

  createMultipleChoiceAnswer(multipleChoiceAnswers: MultipleChoiceAnswer[]): Observable<any> {
    return this.http.post<any>(API_URL + `/createMultipleChoiceAnswer`, multipleChoiceAnswers, {
      headers: {
        Authorization: `Bearer ${""}`,
      }
    })
  }

  createEssayAnswer(essayAnswers: EssayAnswer[]): Observable<any> {
    return this.http.post<any>(API_URL + `/createEssayAnswer`, essayAnswers, {
      headers: {
        Authorization: `Bearer ${""}`,
      }
    })
  }
}
