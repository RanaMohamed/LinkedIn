import { Component, OnInit, Input, OnChanges } from "@angular/core";

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
  constructor() {}

  ngOnInit() {
    this.activeSlide = this.startSlide;
  }

  ngOnChanges(): void {
    this.activeSlide = this.startSlide;
  }
}
