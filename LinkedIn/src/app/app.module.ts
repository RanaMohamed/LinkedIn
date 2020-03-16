import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./core/header/header.component";
import { ProfileComponent } from "./features/profile/profile.component";
import { HomeComponent } from "./features/home/home.component";
import { EducationComponent } from "./features/profile/education/education.component";
import { EducationFormComponent } from "./features/profile/education/education-form/education-form.component";
import { ConfirmationComponent } from "./shared/confirmation/confirmation.component";
import { IntroComponent } from "./features/profile/intro/intro.component";
import { IntroFormComponent } from "./features/profile/intro/intro-form/intro-form.component";
import { ContactInfoFormComponent } from "./features/profile/intro/contact-info-form/contact-info-form.component";
import { ContactComponent } from './features/profile/intro/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    HomeComponent,
    EducationComponent,
    EducationFormComponent,
    ConfirmationComponent,
    IntroComponent,
    IntroFormComponent,
    ContactInfoFormComponent,
    ContactComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
