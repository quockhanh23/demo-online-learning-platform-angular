import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tuition} from "../model/tuition";
import {PageUser} from "../model/page-user";
import {PageTuition} from "../model/page-tuition";

const API_URL = "http://localhost:8080/api/tuitions"

@Injectable({
  providedIn: 'root'
})
export class TuitionService {

  constructor(private http: HttpClient) {
  }

  createTuition(idUsers: number[], tuition: any): Observable<any> {
    return this.http.post<any>(API_URL + `/createTuition?idUsers=${idUsers}`, tuition, {})
  }

  getAllTuitionByIdUser(idUser: any): Observable<Tuition[]> {
    return this.http.get<Tuition[]>(API_URL + `/getAllTuitionByIdUser?idUser=${idUser}`, {})
  }

  getAllTuitionPage(page: any, size: any, searchText: string, idUserLogin: any): Observable<PageTuition> {
    return this.http.get<PageTuition>(API_URL +
      `/getAllTuitionPage?idUserLogin=${idUserLogin}&page=${page}&size=${size}&searchText=${searchText}`)
  }
}
