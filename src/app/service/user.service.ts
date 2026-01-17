import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {UserDTO} from "../model/user-dto";
import {ChangePassword} from "../model/change-password";

const API_URL = "http://localhost:8080/api/users"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getDetailUser(idUser: any): Observable<UserDTO> {
    return this.http.get<UserDTO>(API_URL + `/getDetailUser?idUser=${idUser}`, {})
  }

  login(user: Object): Observable<User> {
    return this.http.post<User>(API_URL + `/login`, user)
  }

  updateUser(user: Object, token: any): Observable<UserDTO> {
    return this.http.put<UserDTO>(API_URL + `/updateUser`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  changePassword(idUser: any, changePassword: ChangePassword): Observable<ChangePassword> {
    return this.http.put<ChangePassword>(API_URL + `/changePassword?idUser=${idUser}`, changePassword, {})
  }
}
