import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Experience } from "src/app/_models/experience";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../auth/auth.service";
import { Company } from "src/app/_models/company";

@Injectable({
  providedIn: "root"
})
export class ExperienceService {
  private experiences: Subject<Experience[]>;
  private list: Experience[] = [];
  private experiencesUrl = "http://localhost:3000/experiences";
  private companiesUrl = "http://localhost:3000/companies";
  constructor(private http: HttpClient, private auth: AuthService) {
    this.experiences = new Subject<Experience[]>();
  }

  getAll(userId: number = this.auth.getLoggedUserId()) {
    this.http
      .get<Experience[]>(
        `${this.experiencesUrl}?_expand=company&_sort=end.year&_order=desc&userId=${userId}`
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
      .get<Company[]>(`${this.companiesUrl}?name=${company.name}`)
      .subscribe(comps => {
        if (comps.length > 0) {
          this.saveExperience({
            companyId: comps[0].id,
            userId: this.auth.getLoggedUserId(),
            ...experience
          });
        } else {
          this.http
            .post<Company>(`${this.companiesUrl}`, {
              name: company.name
            })
            .subscribe(comp => {
              this.saveExperience({
                companyId: comp.id,
                userId: this.auth.getLoggedUserId(),
                ...experience
              });
            });
        }
      });
  }

  saveExperience(experience) {
    this.http
      .post<Experience>(`${this.experiencesUrl}`, experience)
      .subscribe(res => {
        this.getAll();
      });
  }

  edit(experience: Experience) {
    const company = experience.company;
    delete experience.company;
    const index = this.list.findIndex(ex => ex.id === experience.id);
    if (this.list[index].company.name === company.name) {
      this.editExperience(experience);
    } else {
      this.http
        .get<Company[]>(`${this.companiesUrl}?name=${company.name}`)
        .subscribe(comps => {
          if (comps.length > 0) {
            this.editExperience({
              ...experience,
              companyId: comps[0].id
            });
          } else {
            this.http
              .post<Company>(`${this.companiesUrl}`, {
                name: company.name
              })
              .subscribe(comp => {
                this.editExperience({
                  ...experience,
                  companyId: comp.id
                });
              });
          }
        });
    }
  }

  editExperience(experience) {
    this.http
      .put<Experience>(`${this.experiencesUrl}/${experience.id}`, experience)
      .subscribe(res => {
        this.getById(res.id).subscribe(resp => {
          this.getAll();
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
