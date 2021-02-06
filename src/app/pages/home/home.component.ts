import { Component, OnInit } from '@angular/core';
import { OperationApiService } from 'src/app/services/api/operation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  operations: any;

  constructor(private operationApiService: OperationApiService) { }

  ngOnInit(): void {
    this.operationApiService.getAllOperations((operations: any) => {
      console.log('next', operations);
      this.operations = operations;
    }, (err) => {
      console.log('error', err);
    });
  }

  getDateString(dateStr: string): string {
    const date = new Date(dateStr);
    const days = [
      'lundi', 'mardi', 'mercredi', 'jeudi',
      'vendredi', 'samedi', 'dimanche'
    ];
    const months = [
      'janvier', 'février', 'mars', 'avril', 'mai',
      'juin', 'juillet', 'août', 'septembre',
      'octobre', 'november', 'décembre'
    ];
    const day = days[date.getDay()];
    const dayNumber = date.getUTCDay();
    const first = dayNumber === 1 ? 'er' : '';
    const month = months[date.getMonth()];
    const year = date.getUTCFullYear();
    return `Le ${day} ${dayNumber}${first} ${month} ${year}`;
  }

}
