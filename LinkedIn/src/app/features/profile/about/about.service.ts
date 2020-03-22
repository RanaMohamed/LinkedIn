import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { About } from "./../../../_models/about";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class AboutService {
  private aboutData: Subject<About>;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.aboutData = new Subject<About>();
  }

  getById(): Observable<About> {
    this.http
      .get<About>(
        `http://localhost:3000/abouts?userId=${this.auth.getLoggedUserId()}`
      )
      .subscribe(res => {
        this.aboutData.next(res);
      });
    return this.aboutData;
  }

  add(ab: About) {
    this.http
      .post<About>(`http://localhost:3000/abouts`, {
        ...ab,
        userId: this.auth.getLoggedUserId()
      })
      .subscribe(res => {
        this.getById();
      });
  }

  edit(ab: About) {
    this.http
      .put<About>(`http://localhost:3000/abouts/${ab.id}`, ab)
      .subscribe(res => {
        this.getById();
      });
  }
}
