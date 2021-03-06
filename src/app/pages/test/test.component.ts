import { Component, OnInit } from '@angular/core';
import { TestApiService } from 'src/app/services/api/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  pagesViewCount: any;

  constructor(private testApiService: TestApiService) { }

  ngOnInit(): void {
    this.testApiService.getAllPagesViewCount((data) => {
      this.pagesViewCount = data;
    });
  }

}
