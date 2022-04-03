import { Component, OnInit } from '@angular/core';
import { OperationApiService } from 'src/app/services/api/operation.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  private stats: any;

  constructor(
    private operationApiService: OperationApiService
  ) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    const date = new Date();
    const params = {
      year: date.getFullYear(),
      month: date.getMonth() + 1
    };
    this.operationApiService.getUserStats(params, (result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }

}
