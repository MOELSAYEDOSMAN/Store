import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent {
  constructor(private loca:Location) {
  }
  backPage()
  {
    this.loca.back();
  }
}
