import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../model/course";

const API_URL = "http://localhost:8080/api/courses"

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {
  }

  createCourse(course: Course): Observable<any> {
    return this.http.post<any>(API_URL + `/createCourse`, course, {
      headers: {
        Authorization: `Bearer ${""}`,
      }
    })
  }

  getDetailCourse(idCourse: any): Observable<Course> {
    return this.http.get<Course>(API_URL + `/getDetailCourse?idCourse=${idCourse}`,)
  }
}
