import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-post-video-form",
  templateUrl: "./post-video-form.component.html",
  styleUrls: ["./post-video-form.component.scss"]
})
export class PostVideoFormComponent implements OnInit {
  @Output() closeForm = new EventEmitter<string>();
  videoForm: FormGroup = new FormGroup({});
  video: string;
  file: File;
  constructor() {}

  ngOnInit() {}

  onFileChange(event) {
    this.video = null;
    this.file = event.target.files[0];
    if (event.target.files && event.target.files.length <= 9) {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.video = reader.result.toString();
      };
    }
  }

  submitForm() {
    this.closeForm.next(this.video);
  }

  close() {
    this.closeForm.next();
  }
}
