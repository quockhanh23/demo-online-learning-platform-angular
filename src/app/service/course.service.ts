import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../model/course";
import {PageCourse} from "../model/pageCourse";
import {CourseRegister} from "../model/courseRegister";

const API_URL = "http://localhost:8080/api/courses"

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {
  }

  getAllCourse(page: any, size: any, searchText: string): Observable<PageCourse> {
    return this.http.get<PageCourse>(API_URL + `/getAllCourse?page=${page}&size=${size}&searchText=${searchText}`)
  }

  registerCourse(idCourse: any, idUserRegister: any): Observable<any> {
    return this.http.post<any>(API_URL + `/registerCourse?idCourse=${idCourse}&idUserRegister=${idUserRegister}`, {
      headers: {
        Authorization: `Bearer ${""}`,
      }
    })
  }

  createCourse(course: Course, idUser: any): Observable<any> {
    return this.http.post<any>(API_URL + `/createCourse?idUser=${idUser}`, course, {
      headers: {
        Authorization: `Bearer ${""}`,
      }
    })
  }

  getDetailCourse(idCourse: any): Observable<Course> {
    return this.http.get<Course>(API_URL + `/getDetailCourse?idCourse=${idCourse}`,)
  }
}
