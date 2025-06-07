import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Lesson} from "../model/lesson";

const API_URL = "http://localhost:8080/api/lessons"

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) {
  }

  createLesson(lesson: Lesson): Observable<any> {
    return this.http.post<any>(API_URL + `/createLesson`, lesson, {
      headers: {
        Authorization: `Bearer ${""}`,
      }
    })
  }

  getDetailLesson(idLesson: any): Observable<Lesson> {
    return this.http.get<Lesson>(API_URL + `/getDetailLesson?idLesson=${idLesson}`,)
  }

  updateLesson(lesson: Lesson): Observable<any> {
    return this.http.post<any>(API_URL + `/updateLesson`, lesson, {
      headers: {
        Authorization: `Bearer ${""}`,
      }
    })
  }
}
