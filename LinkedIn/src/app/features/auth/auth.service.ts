import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/_models/user";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _registerUrl = "http://localhost:3000/users";
  private _loginUrl = "http://localhost:3000/users";
  user: User = null;
  constructor(private http: HttpClient) {}

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    this.user = user;
    // return this.http.post<any>(this._loginUrl, user);
  }

  getAll() {
    return this.http.get<any>("http://localhost:3000/users");
  }

  isLoggedIn() {
    return this.user ? true : false;
  }
}
