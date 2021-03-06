import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

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
import { ContactComponent } from "./features/profile/intro/contact/contact.component";
import { ExperienceComponent } from "./features/profile/experience/experience.component";
import { ExperienceFormComponent } from "./features/profile/experience/experience-form/experience-form.component";
import { PostFormComponent } from "./features/home/post/post-form/post-form.component";
import { LoginComponent } from "./features/auth/login/login.component";
import { RegisterationComponent } from "./features/auth/registeration/registeration.component";
import { LogoComponent } from "./shared/logo/logo.component";
import { AboutComponent } from "./features/profile/about/about.component";
import { AboutFormComponent } from "./features/profile/about/about-form/about-form.component";
import { PostComponent } from "./features/home/post/post/post.component";
import { PostImageFormComponent } from "./features/home/post/post-image-form/post-image-form.component";
import { JobsComponent } from "./features/jobs/jobs.component";
import { JobCardComponent } from "./features/jobs/job-card/job-card.component";
import { SliderComponent } from "./shared/slider/slider.component";
import { ModalComponent } from "./shared/modal/modal.component";
import { PostVideoFormComponent } from "./features/home/post/post-video-form/post-video-form.component";
import { PostCommentComponent } from "./features/home/post/post-comment/post-comment.component";
import { NotificationsComponent } from "./features/notifications/notifications.component";
import { MessagingComponent } from "./features/messaging/messaging.component";
import { NotificationComponent } from "./features/notifications/notification/notification.component";
import { MessageComponent } from './features/messaging/message/message.component';

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
    ContactComponent,
    ExperienceComponent,
    ExperienceFormComponent,
    PostFormComponent,
    LoginComponent,
    RegisterationComponent,
    LogoComponent,
    PostComponent,
    PostImageFormComponent,
    AboutComponent,
    AboutFormComponent,
    JobsComponent,
    JobCardComponent,
    SliderComponent,
    ModalComponent,
    PostVideoFormComponent,
    PostCommentComponent,
    NotificationsComponent,
    MessagingComponent,
    NotificationComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
