import { Injectable } from "@angular/core";
import { Education } from "src/app/_models/education";
import { Subject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class EducationService {
  private educations: Subject<Education[]>;
  private list: Education[] = [];
  private educationsUrl = "http://localhost:3000/educations";
  constructor(private http: HttpClient, private auth: AuthService) {
    this.educations = new Subject<Education[]>();
  }

  getAll(): Subject<Education[]> {
    this.http
      .get<Education[]>(
        `${
          this.educationsUrl
        }?_expand=school&_sort=end.year&_order=desc&userId=${this.auth.getLoggedUserId()}`
      )
      .subscribe(res => {
        this.list = res;
        this.educations.next(this.list);
      });
    return this.educations;
  }

  getById(id: number): Observable<Education> {
    return this.http.get<Education>(
      `${this.educationsUrl}/${id}?_expand=school`
    );
  }

  add(education: Education) {
    const school = education.school;
    delete education.school;
    this.http
      .post<Education>(`${this.educationsUrl}`, {
        schoolId: 1,
        userId: this.auth.getLoggedUserId(),
        ...education
      })
      .subscribe(res => {
        this.getAll();
      });
  }

  edit(education: Education) {
    delete education.school;
    this.http
      .put<Education>(`${this.educationsUrl}/${education.id}`, education)
      .subscribe(res => {
        this.getAll();
      });
  }

  delete(id: number) {
    this.http
      .delete<Education>(`${this.educationsUrl}/${id}`)
      .subscribe(res => {
        this.list = this.list.filter(ed => ed.id !== id);
        this.educations.next(this.list);
      });
  }
}
