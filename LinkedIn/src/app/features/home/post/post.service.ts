import { Injectable } from "@angular/core";
import { Post, Comment } from "src/app/_models/post";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PostService {
  private posts: Subject<Post[]>;
  private post: Subject<Post>;
  private list: Post[] = [
    {
      id: 1,
      user: {
        name: "Valeo",
        headline: "679,771 followers",
        image: "https://via.placeholder.com/60"
      },
      date: new Date("01/28/2020"),
      description:
        "Leveraging AI and the information captured by various sensors to deliver ultimate personalized comfort, Valeo provides a customized comfort bubble to suit each vehicle occupant with Valeo Smart Cocoon.By practically rendering the vehicle empathetic, this innovative technology takes the state of its driver and passengers into account, detecting signs of fatigue, distraction, emotion and stress.",
      likes: 5,
      comments: [
        {
          user: {
            name: "khaled Nasser",
            headline: "Software Team leader at Mind Cloud",
            image:
              "https://media-exp1.licdn.com/dms/image/C5603AQH955_PzrUuEw/profile-displayphoto-shrink_100_100/0?e=1590019200&v=beta&t=TbPeKcdYtbJ1JsbjpWo7m3p_LgprlBI2zt3irxiNVH8"
          },
          comment: "Test",
          date: new Date("01/29/2020")
        }
      ]
    },
    {
      id: 2,
      user: {
        name: "khaled Nasser",
        headline: "Software Team leader at Mind Cloud",
        image:
          "https://media-exp1.licdn.com/dms/image/C5603AQH955_PzrUuEw/profile-displayphoto-shrink_100_100/0?e=1590019200&v=beta&t=TbPeKcdYtbJ1JsbjpWo7m3p_LgprlBI2zt3irxiNVH8"
      },
      description:
        "I have been working in the last three months on two scholarships and happy to complete them it was an enriching experience where I found a lot of projects and great content 1- Intel® Edge AI Scholarship by Udacity and Intel Corporation I would really thank Michael Virgo for the great content 2- Bertelsmann Tech Scholarship Challenge Course - AI Track and thanks to Udacity for this Great opportunities #deeplearning #computervision #udacityinteltechscholars  #bertelsmann #edgeai #intel",
      images: [
        "https://media-exp1.licdn.com/dms/image/C5622AQEdOoPOQTf6BQ/feedshare-shrink_800/0?e=1586995200&v=beta&t=4qh7ploCTcPLc8IuESWliJQW8gmlucEZZbd2WPcwTxM",
        "https://media-exp1.licdn.com/dms/image/C5622AQHJyTok9athiw/feedshare-shrink_800/0?e=1586995200&v=beta&t=GuY2ATxkMPO1iOVZa04hn3gDTs6F7whCZkiiDNDYjqs",
        "https://media-exp1.licdn.com/dms/image/C5622AQFnb1_syIg1nA/feedshare-shrink_800/0?e=1586995200&v=beta&t=vY1GznQavUILGycPU_SbzJpDTeEmX5-M15EY5j4mXpE"
      ],
      likes: 32,
      comments: [
        {
          comment: "Congratulations",
          user: {
            name: "Rana Mohamed",
            headline:
              "Web and UI Student at Information Technology Institute (ITI)",
            image:
              "https://media-exp1.licdn.com/dms/image/C4E03AQFksu7c46jpMw/profile-displayphoto-shrink_100_100/0?e=1590019200&v=beta&t=mk9MYi7svRtZ9ph1tafi_j-4Ix--HAI_MYmoDBp_tKY"
          },
          date: new Date("03/17/2020")
        },
        {
          comment: "Thanks Aishwarya N.",
          user: {
            name: "khaled Nasser",
            headline: "Software Team leader at Mind Cloud",
            image:
              "https://media-exp1.licdn.com/dms/image/C5603AQH955_PzrUuEw/profile-displayphoto-shrink_100_100/0?e=1590019200&v=beta&t=TbPeKcdYtbJ1JsbjpWo7m3p_LgprlBI2zt3irxiNVH8"
          },
          date: new Date("03/17/2020")
        }
      ],
      date: new Date("03/17/2020")
    }
  ];
  private lastId = 2;
  constructor() {
    this.posts = new Subject<Post[]>();
    this.post = new Subject<Post>();
  }

  getAll() {
    setTimeout(() => {
      this.posts.next(this.list);
    }, 5);
    return this.posts;
  }

  getById(id: number): Subject<Post> {
    setTimeout(() => {
      this.post.next(this.list.find(p => p.id === id));
    }, 5);
    return this.post;
  }

  add(post: Post) {
    post.id = ++this.lastId;
    post.comments = [];
    post.isLiked = false;
    post.likes = 0;
    this.list.unshift(post);
    this.posts.next(this.list);
  }

  edit(post: Post) {
    const index = this.list.findIndex(p => p.id === post.id);
    this.list[index] = post;
    this.posts.next(this.list);
  }

  delete(id: number) {
    this.list = this.list.filter(p => p.id !== id);
    this.posts.next(this.list);
  }

  addComment(id: number, comment: Comment) {
    const index = this.list.findIndex(p => p.id === id);
    this.list[index].comments.push(comment);
    this.posts.next(this.list);
  }

  likePost(id: number) {
    const index = this.list.findIndex(p => p.id === id);
    this.list[index].isLiked
      ? this.list[index].likes--
      : this.list[index].likes++;
    this.list[index].isLiked = !this.list[index].isLiked;
    this.posts.next(this.list);
  }
}
