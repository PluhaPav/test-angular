import {
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import {
  BehaviorSubject,
  interval,
  Observable,
  of,
  SubscriptionLike,
} from "rxjs";
import { filter, scan, switchMap, takeWhile } from "rxjs/operators";
@Component({
  selector: "app-progress",
  templateUrl: "./progress.component.html",
  styleUrls: ["./progress.component.scss"],
})
export class ProgressComponent implements OnInit, OnDestroy {
  private start$ = new BehaviorSubject<boolean>(false);
  private interval: number = 100;
  private increase: number = 1;
  private maxWidth: number = 100;

  public subscribes: SubscriptionLike[] = [];
  public progress$: Observable<number> = of(0).pipe(
    switchMap(() =>
      interval(this.interval).pipe(
        switchMap(() => this.start$.pipe()),
        filter(Boolean),
        scan((width: number) => width += this.increase, 0),
        takeWhile(width => width <= this.maxWidth)
      )
    )
  );

  constructor() { }

  ngOnInit(): void {
    this.subscribes.push(this.start$);
  }

  public start(): void {
    this.start$.next(true);
  }

  public stop(): void {
    this.start$.next(false);
  }

  ngOnDestroy(): void {
    if (this.subscribes && this.subscribes.length > 0) {
      this.subscribes.forEach((sub) => sub.unsubscribe());
    }
  }
}
