import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {PageUser} from "../model/page-user";

const API_URL = "http://localhost:8080/api/admins"

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  register(user: Object, role: any): Observable<User> {
    return this.http.post<User>(API_URL + `/createUser?role=${role}`, user)
  }

  getAllUser(page: any, size: any, searchText: string, idUserLogin: any): Observable<PageUser> {
    return this.http.get<PageUser>(API_URL +
      `/getAllUser?idUserLogin=${idUserLogin}&page=${page}&size=${size}&searchText=${searchText}`)
  }
}
