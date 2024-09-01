import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {interval} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  private destroyRef = inject(DestroyRef)
ngOnInit() {
  const subscription=interval(1000).subscribe( {
    next:(value: number) => console.log(value),
    error: (error: any) => console.error(error),
  });
    this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
    });
}
}
