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

  action(idAdmin: any, idUser: any, action: any): Observable<void> {
    return this.http.put<void>(API_URL + `/action?idAdmin=${idAdmin}&idUser=${idUser}&action=${action}`, {})
  }

  getAllUser(page: any, size: any, searchText: string, idUserLogin: any): Observable<PageUser> {
    return this.http.get<PageUser>(API_URL +
      `/getAllUser?idUserLogin=${idUserLogin}&page=${page}&size=${size}&searchText=${searchText}`)
  }

  getAllUserByRole(page: any, size: any, role: string, idUserLogin: any): Observable<PageUser> {
    return this.http.get<PageUser>(API_URL +
      `/getAllUserByRole?idUserLogin=${idUserLogin}&page=${page}&size=${size}&role=${role}`)
  }

  getAllUserByDepartment(page: any, size: any, idDepartment: string, idUserLogin: any): Observable<PageUser> {
    return this.http.get<PageUser>(API_URL +
      `/getAllUserByDepartment?idUserLogin=${idUserLogin}&page=${page}&size=${size}&idDepartment=${idDepartment}`)
  }
}
