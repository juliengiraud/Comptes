import { Component, Input, OnInit } from '@angular/core';
import { OperationApiService } from 'src/app/services/api/operation.service';
import { Stats } from 'src/app/model/stats.model';

@Component({
    selector: 'app-stats-cell',
    templateUrl: './stats-cell.component.html',
    styleUrls: ['./stats-cell.component.scss']
})
export class StatsCellComponent implements OnInit {

    stats: Stats;
    mode = ''; // global || month
    Object = Object;

    @Input() year: number;
    @Input() month: number;

    constructor(
        private operationApiService: OperationApiService
    ) { }

    ngOnInit(): void {
        this.loadStats();
        this.mode = this.year == null || this.month == null ? 'global' : 'month';
    }

    loadStats(): void {
        const params = {
            year: this.year,
            month: this.month
        };
        this.operationApiService.getUserStats(params, (result) => {
            this.stats = new Stats(result[0]);
        }, (err) => {
            console.log(err);
        });
    }

}
