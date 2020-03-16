import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ContactInfo } from "src/app/_models/contactInfo";
import { FormGroup, FormArray, FormControl } from "@angular/forms";
import { months } from "../../../../_utilities/utilities";
@Component({
  selector: "app-contact-info-form",
  templateUrl: "./contact-info-form.component.html",
  styleUrls: ["./contact-info-form.component.scss"]
})
export class ContactInfoFormComponent implements OnInit {
  @Input() contactInfo: ContactInfo = {
    profileUrl: "",
    urls: [],
    phone: {
      num: 0,
      type: ""
    },
    address: "",
    email: "",
    instantMess: [],
    birthday: {
      day: new Date().getDay(),
      month: months[new Date().getMonth()]
    }
  };
  @Output() closeForm = new EventEmitter();
  @Output() ContactInfoAdded = new EventEmitter<ContactInfo>();

  contactForm: FormGroup;
  confirmCloseOpened = false;
  webSiteType: string[];
  PhoneType: string[];
  IMTypes: string[];
  days: number[] = [];
  months = months;
  backTointroForm = true;
  constructor() {}
  ngOnInit() {
    this.webSiteType = [
      "Personal",
      "Company",
      "Blog",
      "RSS Feed",
      "Portfolio",
      "Other"
    ];
    this.PhoneType = ["Home", "Work", "Mobile"];
    this.IMTypes = ["Skype", "ICQ", "Google Hangouts", "QQ", "WeChat"];

    for (let i = 1; i <= 30; i++) {
      this.days.push(i);
    }

    this.contactForm = new FormGroup({
      urls: new FormArray([]),
      phone: new FormGroup({
        num: new FormControl(this.contactForm && this.contactInfo.phone.num),
        type: new FormControl(this.contactForm && this.contactInfo.phone.type)
      }),
      address: new FormControl(this.contactForm && this.contactInfo.address),
      instantMess: new FormArray([]),
      birthday: new FormGroup({
        day: new FormControl(this.contactForm && this.contactInfo.birthday.day),
        month: new FormControl(
          this.contactForm && this.contactInfo.birthday.month
        )
      })
    });
  }

  get urls() {
    return this.contactForm.controls.urls as FormArray;
  }

  OnApplyForm() {
    if (this.contactForm.valid) {
      const Contactinfo: ContactInfo = this.contactForm.getRawValue();
      if (this.contactInfo) {
        this.contactInfo = Contactinfo;
        this.contactInfo.profileUrl = "linkedin.com/in/amal-elkady-972009135";
        this.contactInfo.email = "amalelkady4@gmail.com";
        this.ContactInfoAdded.next(this.contactInfo);
      }
      this.close();
    }
  }

  AddNewWebsite() {
    this.contactInfo.urls.push({
      url: "",
      type: ""
    });
    const urlControl = this.contactForm.get("urls");
    (urlControl as FormArray).push(
      new FormGroup({
        url: new FormControl(this.contactForm),
        type: new FormControl(this.contactForm)
      })
    );
  }

  RemoveWebsite(index: number) {
    this.contactInfo.urls.splice(index, 1);
    const urlControl = this.contactForm.get("urls");
    (urlControl as FormArray).removeAt(index);
  }

  AddNewIM() {
    this.contactInfo.instantMess.push({
      inMess: "",
      type: ""
    });
    const IMControl = this.contactForm.get("instantMess");
    (IMControl as FormArray).push(
      new FormGroup({
        inMess: new FormControl(this.contactForm),
        type: new FormControl(this.contactForm)
      })
    );
  }

  RemoveIM(index: number) {
    this.contactInfo.instantMess.splice(index, 1);
    const IMControl = this.contactForm.get("instantMess");
    (IMControl as FormArray).removeAt(index);
  }

  close() {
    if (this.contactForm.touched) {
      this.confirmCloseOpened = true;
    } else {
      this.closeForm.next();
    }
  }

  confirmClose(confirm: boolean) {
    if (confirm) {
      this.closeForm.next();
    } else {
      this.confirmCloseOpened = false;
    }
  }

  backToIntroForm() {
    this.backTointroForm = !this.backTointroForm;
  }
}
