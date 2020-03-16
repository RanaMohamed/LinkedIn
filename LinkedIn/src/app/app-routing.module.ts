import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./features/profile/profile.component";
import { HomeComponent } from "./features/home/home.component";
import { RegisterationComponent } from "./features/auth/registeration/registeration.component";
import { LoginComponent } from "./features/auth/login/login.component";
import { AuthGuard } from "./features/auth/auth.guard";

const routes: Routes = [
  {
    path: "register",
    component: RegisterationComponent
  },
  { path: "login", component: LoginComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "", component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
