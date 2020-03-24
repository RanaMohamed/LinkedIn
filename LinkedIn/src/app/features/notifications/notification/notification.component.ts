import { Component, OnInit, Input } from "@angular/core";
import { Notifications } from "./../../../_models/notifications";
import { NotificationsService } from "./../notifications.service";
import * as moment from "moment";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"]
})
export class NotificationComponent implements OnInit {
  @Input() notification: Notifications;
  moment = moment;
  dropdownOpened = false;
  constructor(private notificationService: NotificationsService) {}

  ngOnInit() {}

  deleteNotification() {
    this.notificationService.delete(this.notification.id);
  }
}
