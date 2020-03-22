import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-registeration",
  templateUrl: "./registeration.component.html",
  styleUrls: ["./registeration.component.scss"]
})
export class RegisterationComponent implements OnInit {
  @ViewChild("f", { static: true }) Data: NgForm;

  registerData: { email: string; password: string };

  constructor(private _auth: AuthService, private router: Router) {}

  ngOnInit() {
    // this.registerData={
    //   email:this.Data.value.email,
    //   password: this.Data.value.password
    // }
    // setTimeout((_Data: any) => {
    //   this.Data.setValue(this.registerData);
    // });
  }

  // showData(){
  //   console.log(this.registerData);
  // }

  registerUser(f: NgForm) {
    this._auth.registerUser(f.value).subscribe(
      res => {
        this._auth.addUser().subscribe(res => this.router.navigate(["/login"]));
      },
      err => console.log(err)
    );
    this.Data.reset();
  }

  // submit(f: NgForm) {
  //   console.log(f.value);
  // }
}
