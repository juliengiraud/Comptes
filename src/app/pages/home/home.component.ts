import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  updateEvent: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
  }

  updateOperations(): void {
    this.updateEvent.next();
  }

}
