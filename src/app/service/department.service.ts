import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PageDepartment} from "../model/page-department";
import {Department} from "../model/department";

const API_URL = "http://localhost:8080/api/departments"

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) {
  }

  getAllDepartment(idUserLogin: any, page: any, size: any, status: any, searchText: string): Observable<PageDepartment> {
    return this.http.get<PageDepartment>(API_URL +
      `/getAllDepartment?idUserLogin=${idUserLogin}&page=${page}&size=${size}&status=${status}&searchText=${searchText}`)
  }

  createDepartment(department: Department, idUserLogin: any): Observable<any> {
    return this.http.post<any>(API_URL + `/createDepartment?idUserLogin=${idUserLogin}`, department, {})
  }

  action(idUserLogin: any, idDepartment: any, action: any): Observable<void> {
    return this.http.put<void>(API_URL +
      `/action?idUserLogin=${idUserLogin}&idDepartment=${idDepartment}&action=${action}`, {})
  }
}
