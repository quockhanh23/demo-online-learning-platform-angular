import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageNotification} from "../model/pageNotification";

const API_URL = "http://localhost:8080/api/notifications"

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {
  }

  getAllNotificationPage(idUserReceiver: any, page: any, size: any): Observable<PageNotification> {
    return this.http.get<PageNotification>(API_URL +
      `/getAllNotificationPage?idUserReceiver=${idUserReceiver}&page=${page}&size=${size}`)
  }

  updateNotification(idNotification: any): Observable<any> {
    return this.http.put<any>(API_URL + `/updateNotification?idNotification=${idNotification}`, {})
  }

  updateAllStatus(ids: any[]): Observable<any> {
    return this.http.put<any>(API_URL + `/updateAllStatus`, ids);
  }
}
