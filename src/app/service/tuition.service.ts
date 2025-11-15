import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tuition} from "../model/tuition";

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
}
