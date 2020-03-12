import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.scss"]
})
export class ConfirmationComponent implements OnInit {
  @Input() message: string;
  @Input() button: string;
  @Output() closeModal = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit() {}
}
