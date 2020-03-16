import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from "../auth.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @ViewChild('f') Data: NgForm;

  registerData: { email: string; password: string; };
  

  constructor(private _auth: AuthService) { }

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

  registerUser(f:NgForm){
    this._auth.registerUser(f.value)
    .subscribe(
      res=>console.log(res),
      err => console.log(err)
    )
    this.Data.reset();
  };
  
   submit(f:NgForm) {
     console.log(f.value)
     
    };


}
