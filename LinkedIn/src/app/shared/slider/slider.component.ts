import {
  Component,
  OnInit,
  Input,
  OnChanges,
  HostListener
} from "@angular/core";

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"]
})
export class SliderComponent implements OnInit, OnChanges {
  @Input() images: string[];
  @Input() startSlide: number;
  activeSlide = 0;
  Math = Math;
  @HostListener("document:keydown", ["$event"]) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (event.key === "ArrowRight") {
      this.activeSlide = Math.min(this.activeSlide + 1, this.images.length - 1);
    } else if (event.key === "ArrowLeft") {
      this.activeSlide = Math.max(this.activeSlide - 1, 0);
    }
  }
  constructor() {}

  ngOnInit() {
    this.activeSlide = this.startSlide;
  }

  ngOnChanges(): void {
    this.activeSlide = this.startSlide;
  }
}
