import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/_models/user";
import { Intro } from "src/app/_models/intro";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  userId: number;
  constructor(private http: HttpClient) {}

  registerUser(user) {
    return this.http.post<any>("http://localhost:3000/logins", user);
  }

  addUser() {
    return this.http.post<any>("http://localhost:3000/users", {});
  }

  loginUser(user) {
    this.userId = user.userId;
    localStorage.setItem("user", user.id);
  }

  getAll() {
    return this.http.get<any>("http://localhost:3000/logins");
  }

  logout() {
    this.userId = null;
    localStorage.removeItem("user");
  }

  isLoggedIn() {
    this.userId = JSON.parse(localStorage.getItem("user"));
    return this.userId || localStorage.getItem("user") ? true : false;
  }
  getLoggedUserId() {
    return this.userId;
  }
  getLoggedUser() {
    return this.http.get<Intro>(`http://localhost:3000/users/${this.userId}`);
  }
}
