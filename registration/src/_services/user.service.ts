import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { User } from '../_models/user';

// import { config } from 'process';

@Injectable ({providedIn: 'root'})

 export class UserService {
     constructor (private http:HttpClient){}

     getAll() {
         return this.http.get<any>("http://localhost:3000/users")
     }

    
 }