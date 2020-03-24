import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/features/auth/auth.service";
import { Router } from "@angular/router";
import { NotificationsService } from "./../../features/notifications/notifications.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  dropdownOpened = false;
  noOfNotifications;
  constructor(
    private auth: AuthService,
    private router: Router,
    private notiService: NotificationsService
  ) {}

  ngOnInit() {
    this.notiService
      .getNotificationLength()
      .subscribe(n => (this.noOfNotifications = n));
  }

  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
}
