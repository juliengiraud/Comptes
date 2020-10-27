import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/api-services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  public pagesViewCount: any;
  // public visits: any;
  public fridrichDownloadCount: any = '...';
  public fridrichViewCount: any = '...';
  public newBearerToken: any = '...';

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.testService.getAllPagesViewCount((data) => {
      this.pagesViewCount = data;
      console.log(data);
    });
    // this.testService.getAllVisits((data) => {
    //   this.visits = data;
    //   console.log('visitCount', data);
    // });
    this.testService.getFridrichDownloadCount((data) => {
      this.fridrichDownloadCount = data;
      console.log('fridrichDownloadCount', data);
    });
    this.testService.getFridrichViewCount((data) => {
      this.fridrichViewCount = data;
      console.log('fridrichViewCount', data);
    });
    this.testService.getNewBearerToken((data) => {
      this.newBearerToken = data;
      console.log('newBearerToken', data);
    });
  }

}
