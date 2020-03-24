import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Notifications } from "./../../_models/notifications";

@Injectable({
  providedIn: "root"
})
export class NotificationsService {
  private notifications: Subject<Notifications[]>;

  private listOfNotifications: Notifications[] = [
    {
      id: 1,
      user: {
        Fname: "Amal",
        Lname: "ElKady",
        imageUrl: "../../../../assets/imgs/amal_profile_pic.jfif"
      },
      description:
        "Congratulate Amal Elkady for completing coursework at Information Technology Institute (ITI)",
      date: new Date("03/19/2020"),
      actionBtn: "Say congrats",
      unRead: true
    },
    {
      id: 2,
      user: {
        imageUrl: "../../../../assets/imgs/souq_profile_pic.png"
      },
      description:
        "Souq.com just posted a Full Stack role near Egypt that matches your job search",
      date: new Date("03/15/2020"),
      actionBtn: "View Job",
      unRead: true
    },
    {
      id: 3,
      user: {
        imageUrl: "../../../../assets/imgs/sohaib_profile_pic.jfif"
      },
      description:
        " Sohaib Hasan's post has been trending in #jobs: Expert CV writer Trisha Chapman ✍ shares how to cover career gaps on the CV. A short clip from our LinkedIn Live “Inside Recruitment Cycle” where ",
      date: new Date("03/11/2020"),
      Reactions: 581,
      noComments: 65,
      unRead: true
    },
    {
      id: 4,
      user: {
        imageUrl: "../../../../assets/imgs/job_alert_pic.png"
      },
      title: "Your Job Alert",
      description: " Basant, 30+ new jobs for Full Stack jobs ",
      date: new Date("03/08/2020"),
      actionBtn: "View new jobs",
      unRead: false
    },
    {
      id: 5,
      user: {
        imageUrl: "../../../../assets/imgs/daily_rundown.png"
      },
      title: "DAILY RUNDOWN: THURSDAY",
      description:
        " UAE suspends residents from entry, oil crashes to lowest in 18 years, and other top news for you",
      date: new Date("03/06/2020"),
      unRead: false
    },
    {
      id: 6,
      user: {
        imageUrl: "../../../../assets/imgs/search_appeared_pic.png"
      },
      description: "You appeared in 2 searches this week",
      date: new Date("02/08/2020"),
      unRead: false
    },
    {
      id: 7,
      user: {
        imageUrl: "../../../../assets/imgs/anthony_profile_pic.jfif"
      },
      description:
        "Anthony J James's post has been trending in #technology: This off-road wheelchair gives true freedom! Awesome tech changing peoples lives #technology #innovation Credit: Ziesel Sport via Tech",
      date: new Date("02/04/2020"),
      Reactions: 3790,
      noComments: 193,
      unRead: false
    }
  ];

  private unReadNotification: Subject<number>;
  constructor() {
    this.notifications = new Subject<Notifications[]>();
    this.unReadNotification = new Subject<number>();
  }

  getAll(): Subject<Notifications[]> {
    setTimeout(() => {
      this.notifications.next(this.listOfNotifications);
    }, 5);
    return this.notifications;
  }

  delete(_id) {
    const i = this.listOfNotifications.findIndex(n => n.id === _id);
    this.listOfNotifications.splice(i, 1);
    this.notifications.next(this.listOfNotifications);
  }

  getNotificationLength(): Subject<number> {
    setTimeout(() => {
      this.unReadNotification.next(
        this.listOfNotifications.filter(n => n.unRead === true).length
      );
    }, 5);
    return this.unReadNotification;
  }

  markAsRead() {
    this.listOfNotifications.map(n => (n.unRead = false));
    this.getNotificationLength();
  }
}
