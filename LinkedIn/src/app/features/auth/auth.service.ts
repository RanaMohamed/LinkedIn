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

  getLoggedUser() {
    const user = {
      name: "Rana Mohamed",
      headline: "Web and UI Student at Information Technology Institute (ITI)",
      image:
        "https://media-exp1.licdn.com/dms/image/C4E03AQFksu7c46jpMw/profile-displayphoto-shrink_100_100/0?e=1590019200&v=beta&t=mk9MYi7svRtZ9ph1tafi_j-4Ix--HAI_MYmoDBp_tKY"
    };
    return user;
  }
}
