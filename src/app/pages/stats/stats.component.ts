import { Component, OnInit } from '@angular/core';

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
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ];

    constructor() { }

    ngOnInit(): void {
        const date = new Date();
        this.firstYear = date.getFullYear();
        this.firstMonth = date.getMonth() + 1;
        this.fillYearsAndMonths();
    }

    fillYearsAndMonths(): void {
        const yearsSize = 2;
        for (let currentYear = this.firstYear; currentYear > this.firstYear - yearsSize; currentYear--) {
            const months = [];
            const lastMonthOfYear = currentYear === this.firstYear ? this.firstMonth : 12;
            for (let month = 0; month < lastMonthOfYear; month++) {
                months.push(lastMonthOfYear - month);
            }
            this.monthsByYear.set(currentYear, months);
        }
        this.years = Array.from(this.monthsByYear.keys());
    }

    getYears(): number[] {
        return this.years;
    }
}
