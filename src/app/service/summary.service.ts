import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Summary} from "../model/summary";
import {HttpClient} from "@angular/common/http";
import {LessonCompletion} from "../model/lesson-completion";
import {CompleteCourse} from "../model/complete-course";

const API_URL = "http://localhost:8080/api/summaries"

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private http: HttpClient) {
  }

  courseSummary(idUserLogin: any, page: any, size: any, searchText: any): Observable<Summary[]> {
    return this.http.get<Summary[]>(API_URL + `/courseSummary?idUserLogin=${idUserLogin}`,)
  }

  checkCompleteLesson(idUserLogin: any, idLesson: any): Observable<LessonCompletion> {
    return this.http.get<LessonCompletion>(API_URL + `/checkCompleteLesson?idUserLogin=${idUserLogin}&idLesson=${idLesson}`,)
  }

  checkCompleteCourse(idUserLogin: any): Observable<CompleteCourse[]> {
    return this.http.get<CompleteCourse[]>(API_URL + `/checkCompleteCourse?idUserLogin=${idUserLogin}`,)
  }
}
