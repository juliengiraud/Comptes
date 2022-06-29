import { Component, Input, OnInit } from '@angular/core';

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

    @Input() onlyRecap: boolean;

    constructor() { }

    ngOnInit(): void {
        if (this.onlyRecap == null || !this.onlyRecap) {
            this.fillYearsAndMonths();
        }
    }

    fillYearsAndMonths(): void {
        const date = new Date();
        this.firstYear = date.getFullYear();
        this.firstMonth = date.getMonth() + 1;
        const yearsSize = 2;
        for (let currentYear = this.firstYear; currentYear >= 2018; currentYear--) {
            const months = [];
            const lastMonthOfYear = currentYear === this.firstYear ? this.firstMonth : 12;
            for (let month = 0; month < lastMonthOfYear; month++) {
                if (currentYear === 2018 && month >= 8) {
                    continue;
                }
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
