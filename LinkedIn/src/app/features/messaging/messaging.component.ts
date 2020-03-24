import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-messaging",
  templateUrl: "./messaging.component.html",
  styleUrls: ["./messaging.component.scss"]
})
export class MessagingComponent implements OnInit {
  dropdownOpened = false;
  messageOpened = false;

  constructor() {}

  ngOnInit() {}
}
