import { Component, Input, OnInit } from '@angular/core';
import { OperationApiService } from 'src/app/services/api/operation.service';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

    monthsByYear: Map<number, number[]> = new Map();
    firstYear: number;
    firstMonth: number;
    years: number[] = null;
    monthsCaption = [
        '',
        'Janvier', 'Février', 'Mars',
        'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre',
        'Octobre', 'Novembre', 'Décembre'
    ];

    @Input() onlyRecap: boolean;

    constructor(
        private operationApiService: OperationApiService
    ) { }

    ngOnInit(): void {
        if (this.onlyRecap == null || !this.onlyRecap) {
            this.fillYearsAndMonths();
        }
    }

    fillYearsAndMonths(): void {
        this.operationApiService.getOldestDate((oldestDate) => {
            const oldestYear = parseInt(oldestDate.date.substring(0, 4), 10);
            const oldestMonth = parseInt(oldestDate.date.substring(5, 7), 10) - 1;
            const date = new Date();
            this.firstYear = date.getFullYear();
            this.firstMonth = date.getMonth() + 1;
            for (let currentYear = this.firstYear; currentYear >= oldestYear; currentYear--) {
                const months = [];
                const oldestMonthOfYear = currentYear === this.firstYear ? this.firstMonth : 12;
                for (let month = 0; month < oldestMonthOfYear; month++) {
                    if (currentYear === oldestYear && month >= oldestMonth) {
                        continue;
                    }
                    months.push(oldestMonthOfYear - month);
                }
                this.monthsByYear.set(currentYear, months);
            }
            this.years = Array.from(this.monthsByYear.keys());
        });
    }

    getYears(): number[] {
        return this.years;
    }
}
