import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

    years: number[][]; // year<month>

    constructor() { }

    ngOnInit(): void {
    }

}
