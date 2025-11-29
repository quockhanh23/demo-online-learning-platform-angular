import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Summary} from "../model/summary";
import {HttpClient} from "@angular/common/http";

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
}
