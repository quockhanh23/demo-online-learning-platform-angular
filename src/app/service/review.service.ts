import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageReview} from "../model/pageReview";
import {Review} from "../model/review";

const API_URL = "http://localhost:8080/api/reviews"

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) {
  }

  getAllReview(idCourse: any, page: any, size: any): Observable<PageReview> {
    return this.http.get<PageReview>(API_URL + `/getAllReview?idCourse=${idCourse}&page=${page}&size=${size}`)
  }

  createReview(review: Review): Observable<any> {
    return this.http.post<any>(API_URL + `/createReview`, review, {})
  }

  getDetailReview(idCourse: any, idUserAction: any): Observable<any> {
    return this.http.get<any>(API_URL + `/getDetailReview?idCourse=${idCourse}&idUserAction=${idUserAction}`,)
  }
}
