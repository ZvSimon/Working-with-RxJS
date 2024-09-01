import {Component, computed, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {toObservable} from "@angular/core/rxjs-interop";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  clickCount= signal(0);
  clickCount$= toObservable(this.clickCount);
  // interval = signal(0);
  // doubleInterval = computed(() => this.interval() * 2);
  private destroyRef = inject(DestroyRef);
  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times`);
    // });
    // toObservable(this.clickCount);
  }
  ngOnInit() {

    // setInterval(() => {
    //     this.interval.update((prevValue) => prevValue + 1);
    //     console.log("interval", this.interval());
    //     console.log("doubleInterval", this.doubleInterval());
    // },1000);
  // const subscription=interval(1000).pipe( map((value)=>value*2)).subscribe(
  // {
  //   next:(value: number) => console.log(value),
  //   error: (error: any) => console.error(error),
  // });
  //   this.destroyRef.onDestroy(() => {
  //       subscription.unsubscribe();
  //   });
    const subscription = this.clickCount$.subscribe( {
      next:(value: number) => console.log(`Clicked button ${this.clickCount()} times`)
    });
    this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
        });
  }
  onClick() {
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}
