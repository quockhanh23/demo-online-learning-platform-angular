import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Lesson} from "../model/lesson";
import {PageLesson} from "../model/pageLesson";
import {Test} from "../model/test";

const API_URL = "http://localhost:8080/api/lessons"

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) {
  }

  getAllLessonByCourse(page: any, size: any, idCourse: any, searchText: string): Observable<PageLesson> {
    return this.http.get<PageLesson>(API_URL + `/getAllLessonByCourse?page=${page}&size=${size}&idCourse=${idCourse}&searchText=${searchText}`)
  }

  getAllLessonByCourseList(idCourse: any, searchText: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(API_URL + `/getAllLessonByCourseList?idCourse=${idCourse}&searchText=${searchText}`)
  }

  createLesson(lesson: Lesson, idUser: any): Observable<any> {
    return this.http.post<any>(API_URL + `/createLesson?idUser=${idUser}`, lesson, {
      headers: {
        Authorization: `Bearer ${""}`,
      }
    })
  }

  getDetailLesson(idLesson: any): Observable<Lesson> {
    return this.http.get<Lesson>(API_URL + `/getDetailLesson?idLesson=${idLesson}`,)
  }

  updateLesson(lesson: Lesson, idUser: any): Observable<any> {
    return this.http.put<any>(API_URL + `/updateLesson?idUser=${idUser}`, lesson, {
      headers: {
        Authorization: `Bearer ${""}`,
      }
    })
  }

  highestPointLesson(idLesson: any, idUser: any): Observable<Test> {
    return this.http.get<Test>(API_URL + `/highestPointLesson?idLesson=${idLesson}&idUser=${idUser}`,)
  }
}
