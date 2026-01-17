import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReviewResults} from "../model/review-results";

const API_URL = "http://localhost:8080/api/reviewResults"

@Injectable({
  providedIn: 'root'
})
export class ReviewResultsService {

  constructor(private http: HttpClient) {
  }

  getReviewResults(idTest: any, idLesson: any): Observable<ReviewResults> {
    return this.http.get<ReviewResults>(API_URL + `/getReviewResults?idTest=${idTest}&idLesson=${idLesson}`,)
  }
}
