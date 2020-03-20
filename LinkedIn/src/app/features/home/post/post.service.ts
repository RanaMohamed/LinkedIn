import { Injectable } from "@angular/core";
import { Post, Comment } from "src/app/_models/post";
import { Subject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class PostService {
  private posts: Subject<Post[]>;
  private list: Post[] = [];
  private postsUrl = "http://localhost:3000/posts";
  private commentsUrl = "http://localhost:3000/comments";
  private likesUrl = "http://localhost:3000/likes";
  constructor(private http: HttpClient, private auth: AuthService) {
    this.posts = new Subject<Post[]>();
  }

  getAll() {
    this.http
      .get<Post[]>(
        `${this.postsUrl}?_embed=comments&_embed=likes&_expand=user&_sort=id&_order=desc`
      )
      .subscribe(res => {
        this.list = res.map(post => ({
          ...post,
          isLiked: post.likes.find(
            l => l.userId === this.auth.getLoggedUserId()
          )
            ? true
            : false
        }));
        this.posts.next(this.list);
      });
    return this.posts;
  }

  getById(id: number): Observable<Post> {
    return this.http.get<Post>(
      `${this.postsUrl}/${id}?_embed=comments&_expand=user`
    );
  }

  add(post: Post) {
    this.http
      .post<Post>(this.postsUrl, {
        userId: this.auth.getLoggedUserId(),
        ...post
      })
      .subscribe(res => {
        this.getById(res.id).subscribe(resp => {
          // this.list.unshift(resp);
          // this.posts.next(this.list);
          this.getAll();
        });
      });
  }

  edit(post: Post) {
    delete post.user;
    delete post.comments;
    this.http.put<Post>(`${this.postsUrl}/${post.id}`, post).subscribe(res => {
      this.getById(res.id).subscribe(resp => {
        // const index = this.list.findIndex(p => p.id === post.id);
        // this.list[index] = resp;
        // this.posts.next(this.list);
        this.getAll();
      });
    });
  }

  delete(id: number) {
    this.http.delete<Post>(`${this.postsUrl}/${id}`).subscribe(res => {
      this.list = this.list.filter(p => p.id !== id);
      this.posts.next(this.list);
    });
  }

  getComments(postId: number) {
    return this.http.get<Comment[]>(
      `${this.commentsUrl}?postId=${postId}&_expand=user`
    );
  }

  getCommentById(id: number) {
    return this.http.get<Comment>(`${this.commentsUrl}/${id}?_expand=user`);
  }

  addComment(postId: number, comment: Comment) {
    this.http
      .post<Comment>(this.commentsUrl, {
        userId: this.auth.getLoggedUserId(),
        postId,
        ...comment
      })
      .subscribe(res => {
        this.getCommentById(res.id).subscribe(resp => {
          const index = this.list.findIndex(p => p.id === postId);
          this.list[index].comments.push(resp);
          this.posts.next(this.list);
        });
      });
  }

  deleteComment(id: number, postId: number) {
    this.http.delete<Comment>(`${this.commentsUrl}/${id}`).subscribe(res => {
      const index = this.list.findIndex(p => p.id === postId);
      this.list[index].comments = this.list[index].comments.filter(
        c => c.id !== id
      );
      this.posts.next(this.list);
    });
  }

  likePost(id: number) {
    const index = this.list.findIndex(p => p.id === id);
    if (this.list[index].isLiked) {
      const ind = this.list[index].likes.findIndex(
        l => l.userId === this.auth.getLoggedUserId()
      );
      this.http
        .delete<any>(`${this.likesUrl}/${this.list[index].likes[ind].id}`)
        .subscribe(res => {
          this.list[index].likes.splice(ind, 1);
        });
    } else {
      this.http
        .post<any>(`${this.likesUrl}`, {
          postId: id,
          userId: this.auth.getLoggedUserId()
        })
        .subscribe(res => {
          this.list[index].likes.push(res);
        });
    }
    this.list[index].isLiked = !this.list[index].isLiked;
    this.posts.next(this.list);
  }
}
