import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-operations',
  templateUrl: './all-operations.component.html',
  styleUrls: ['./all-operations.component.scss']
})
export class AllOperationsComponent implements OnInit {

  start = 1;
  length = 16;

  constructor() { }

  ngOnInit(): void {
  }

  showMore(): void {
    this.length *= 2;
  }

  showLess(): void {
    this.length *= 0.5;
  }

}
