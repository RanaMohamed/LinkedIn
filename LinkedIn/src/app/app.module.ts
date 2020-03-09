import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from './core/header/header.component';
import { ProfileComponent } from './features/profile/profile.component';
import { HomeComponent } from './features/home/home.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ProfileComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
