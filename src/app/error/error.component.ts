import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {

  message: string;
  subscrRoute: Subscription;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.subscrRoute = this.route.data.subscribe((data: Data) => {
      if (data && data['message']) {
        this.message = data['message'];
      }
    });

  }

  ngOnDestroy() {
    this.subscrRoute.unsubscribe();
  }

}
