import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  HostListener
} from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Input() size: string;
  @Input() top: boolean;
  @HostListener("document:keydown.escape", ["$event"]) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.closeModal.next();
  }
  constructor() {}

  ngOnInit() {}
}
