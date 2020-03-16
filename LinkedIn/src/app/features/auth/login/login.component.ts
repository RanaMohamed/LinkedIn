import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @ViewChild("f", { static: true }) Data: NgForm;

  constructor(private _auth: AuthService, private router: Router) {}

  loggedIn: boolean = false;

  ngOnInit(): void {}

  userLogin(f) {
    this._auth.getAll().subscribe(res => {
      const loggedUser = res.find(
        user =>
          user.email === f.value.email && user.password === f.value.password
      );
      if (loggedUser) {
        this._auth.loginUser(loggedUser);
        this.router.navigate(["/"]);
      }
    });

    // this.Data.reset();
  }
}
