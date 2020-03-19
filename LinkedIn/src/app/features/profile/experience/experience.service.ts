import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Experience } from "src/app/_models/experience";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class ExperienceService {
  private experiences: Subject<Experience[]>;
  private list: Experience[] = [];
  private experiencesUrl = "http://localhost:3000/experiences";
  constructor(private http: HttpClient, private auth: AuthService) {
    this.experiences = new Subject<Experience[]>();
  }

  getAll() {
    this.http
      .get<Experience[]>(
        `${
          this.experiencesUrl
        }?_expand=company&_sort=end.year&_order=desc&userId=${this.auth.getLoggedUserId()}`
      )
      .subscribe(res => {
        this.list = res;
        this.experiences.next(this.list);
      });
    return this.experiences;
  }

  getById(id: number): Observable<Experience> {
    return this.http.get<Experience>(
      `${this.experiencesUrl}/${id}?_expand=company`
    );
  }

  add(experience: Experience) {
    const company = experience.company;
    delete experience.company;
    this.http
      .post<Experience>(`${this.experiencesUrl}`, {
        companyId: 2,
        userId: this.auth.getLoggedUserId(),
        ...experience
      })
      .subscribe(res => {
        this.getById(res.id).subscribe(resp => {
          this.list.unshift(resp);
          this.experiences.next(this.list);
          console.log(resp, this.list);
        });
      });
  }

  edit(experience: Experience) {
    delete experience.company;
    this.http
      .put<Experience>(`${this.experiencesUrl}/${experience.id}`, experience)
      .subscribe(res => {
        this.getById(res.id).subscribe(resp => {
          const index = this.list.findIndex(ex => ex.id === experience.id);
          this.list[index] = resp;
          this.experiences.next(this.list);
        });
      });
  }

  delete(id: number) {
    this.http
      .delete<Experience>(`${this.experiencesUrl}/${id}`)
      .subscribe(res => {
        this.list = this.list.filter(ex => ex.id !== id);
        this.experiences.next(this.list);
      });
  }
}
