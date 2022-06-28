import { Component, OnInit } from '@angular/core';
import { OperationApiService } from 'src/app/services/api/operation.service';
import { Stats } from 'src/app/model/stats.model';

@Component({
  selector: 'app-stats-cell',
  templateUrl: './stats-cell.component.html',
  styleUrls: ['./stats-cell.component.scss']
})
export class StatsCellComponent implements OnInit {

  stats: Stats;
  Object = Object;

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
      this.stats = new Stats(result[0]);
    }, (err) => {
      console.log(err);
    });
  }

}
