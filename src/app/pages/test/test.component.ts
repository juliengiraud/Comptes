import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TestApiService } from 'src/app/services/api/test.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  pagesViewCount: any;

  constructor(private testApiService: TestApiService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser().then(() => {
      this.testApiService.getAllPagesViewCount((data) => {
        this.pagesViewCount = data;
        console.log(data);
      });
    });
  }

}
