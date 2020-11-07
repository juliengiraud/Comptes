import { Component, OnInit } from '@angular/core';
import { TestApiService } from 'src/app/services/api/test.service';

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

  constructor(private testApiService: TestApiService) { }

  ngOnInit(): void {
    this.testApiService.getAllPagesViewCount((data) => {
      this.pagesViewCount = data;
      console.log(data);
    });
    this.testApiService.getFridrichDownloadCount((data) => {
      this.fridrichDownloadCount = data;
      console.log('fridrichDownloadCount', data);
    });
    this.testApiService.getFridrichViewCount((data) => {
      this.fridrichViewCount = data;
      console.log('fridrichViewCount', data);
    });
    this.testApiService.getNewBearerToken((data) => {
      this.newBearerToken = data;
      console.log('newBearerToken', data);
    });
    this.testApiService.getBPInfos((data) => {
      console.log("banque", data);
    })
  }

}
