import { Injectable } from '@angular/core';

import { Spinner } from 'spin.js';

@Injectable()
export class SpinnerService {

  private spinner = new Spinner({
    lines: 13,
    length: 24,
    width: 5,
    radius: 43,
    corners: 1,
    rotate: 0,
    direction: 1,
    color: '#000',
    speed: 1,
    trail: 60,
    shadow: false,
    className: 'spinner',
    zIndex: 2e9,
    top: '50%',
    left: '50%',
    position: 'fixed'
  });

  start() {
    this.spinner.spin(document.body);
  }

  stop() {
    this.spinner.stop();
  }

}