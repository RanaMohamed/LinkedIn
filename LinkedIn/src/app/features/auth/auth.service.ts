import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/_models/user";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private registerUrl = "http://localhost:3000/users";
  private loginUrl = "http://localhost:3000/users";
  user: User = null;
  constructor(private http: HttpClient) {}

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user) {
    this.user = user;
    localStorage.setItem("user", user);
    // return this.http.post<any>(this.loginUrl, user);
  }

  getAll() {
    return this.http.get<any>("http://localhost:3000/users");
  }

  logout() {
    this.user = null;
    localStorage.removeItem("user");
  }

  isLoggedIn() {
    return this.user || localStorage.getItem("user") ? true : false;
  }
}
