import { Injectable } from "@angular/core";
import { Education } from "src/app/_models/education";
import { Subject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../auth/auth.service";
import { School } from "src/app/_models/school";

@Injectable({
  providedIn: "root"
})
export class EducationService {
  private educations: Subject<Education[]>;
  private list: Education[] = [];
  private educationsUrl = "http://localhost:3000/educations";
  private schoolsUrl = "http://localhost:3000/schools";
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
      .get<School[]>(`${this.schoolsUrl}?name=${school.name}`)
      .subscribe(comps => {
        if (comps.length > 0) {
          this.saveEducation({
            schoolId: comps[0].id,
            userId: this.auth.getLoggedUserId(),
            ...education
          });
        } else {
          this.http
            .post<School>(`${this.schoolsUrl}`, {
              name: school.name
            })
            .subscribe(comp => {
              this.saveEducation({
                schoolId: comp.id,
                userId: this.auth.getLoggedUserId(),
                ...education
              });
            });
        }
      });
  }

  saveEducation(education) {
    this.http
      .post<Education>(`${this.educationsUrl}`, education)
      .subscribe(res => {
        this.getAll();
      });
  }

  edit(education: Education) {
    const school = education.school;
    delete education.school;
    const index = this.list.findIndex(ex => ex.id === education.id);
    if (this.list[index].school.name === school.name) {
      this.editEducation(education);
    } else {
      this.http
        .get<School[]>(`${this.schoolsUrl}?name=${school.name}`)
        .subscribe(comps => {
          if (comps.length > 0) {
            this.editEducation({
              ...education,
              schoolId: comps[0].id
            });
          } else {
            this.http
              .post<School>(`${this.schoolsUrl}`, {
                name: school.name
              })
              .subscribe(comp => {
                this.editEducation({
                  ...education,
                  schoolId: comp.id
                });
              });
          }
        });
    }
  }

  editEducation(education) {
    this.http
      .put<Education>(`${this.educationsUrl}/${education.id}`, education)
      .subscribe(res => {
        this.getById(res.id).subscribe(resp => {
          this.getAll();
        });
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
