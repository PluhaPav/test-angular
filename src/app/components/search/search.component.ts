import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, SubscriptionLike } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { IPost } from 'src/app/interfaces/post';
import { GetPostsService } from 'src/app/services/get-posts.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [GetPostsService],
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchForm: FormGroup;
  public posts: IPost[] = [];
  public subscribes: SubscriptionLike[] = [];
  public searchValue: number = null;
  public isBigNumber = false;

  constructor(private postService: GetPostsService) {
    this.searchForm = new FormGroup({
      search: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{1,2}')
      ]),
    });
    this.subscribes.push(this.checkedChangeValueInput());
  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.subscribes.push(this.getPosts());
  }

  private getPosts(): SubscriptionLike {
    this.isBigNumber = false;
    if (this.searchValue && this.searchValue <= 100) {
      return this.postService.getPostById(this.searchValue).subscribe(posts => {
        if (typeof posts !== 'string') {
          this.posts = [posts];
        }
      }, (error) => console.log('Error throw from ' + error, 'getPosts has search value'));
    } else if (this.searchValue && this.searchValue > 100) {
      this.isBigNumber = true;
      return;
    }
    return this.postService.getPosts().subscribe(posts => {
      if (typeof posts !== 'string') {
        this.posts = posts;
      }
    }, (error) => console.log('Error throw from ' + error, 'getPosts has not search value'));
  }

  private checkedChangeValueInput(): SubscriptionLike {
    return this.searchForm.get('search').valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.searchValue = Number(value);
      this.init();
    }, (error) => console.log('Error throw from ' + error, 'constructor'))
  }

  ngOnDestroy(): void {
    if (this.subscribes && this.subscribes.length > 0) {
      this.subscribes.forEach((sub) => sub.unsubscribe());
    }
  }
}
