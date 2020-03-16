import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/_services/user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') Data: NgForm;

  constructor(private _userService: UserService, private router:Router) { }
  
  loggedIn:boolean = false;

  ngOnInit(): void {
  }
  userLogin(f) {
    this._userService.getAll()
    .subscribe (
      res => {
        console.log(res[0].email);
        const user = res.find( user =>
          user.email === f.value.email && 
          user.password === f.value.password)
        
        if(user) {
         this.router.navigate(['/home']);
        };
      }
      );

     
    this.Data.reset;
    
  }

}
