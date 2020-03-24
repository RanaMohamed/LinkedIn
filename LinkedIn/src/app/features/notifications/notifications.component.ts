import { Component, OnInit, OnDestroy } from "@angular/core";
import { NotificationsService } from "./notifications.service";
import { Notifications } from "./../../_models/notifications";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"]
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: Notifications[] = [];
  currentDate = new Date();
  recent: Notifications[] = [];

  constructor(private notificationService: NotificationsService) {}
  ngOnDestroy(): void {
    this.notificationService.markAsRead();
  }

  ngOnInit() {
    this.notificationService.getAll().subscribe(response => {
      this.notifications = [];
      this.recent = [];
      response.map(rec => {
        if (this.currentDate.getDate() - rec.date.getDate() <= 10) {
          this.recent.push(rec);
        } else {
          this.notifications.push(rec);
        }
      });
      console.log(this.recent);
    });
  }
}
