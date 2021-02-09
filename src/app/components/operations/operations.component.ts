import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OperationApiService } from 'src/app/services/api/operation.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {

  start = 1;
  length: number;
  operations: any;

  @Input() set length_(length: number) {
    if (this.operations != null) {
      this.updateOperations(this.length, length);
    }
    this.length = length;
  }

  @Output() tooMuch: EventEmitter<void> = new EventEmitter();

  constructor(private operationApiService: OperationApiService) { }

  ngOnInit(): void {
    this.operationApiService.getOperations(this.start, this.length, (operations: any) => {
      console.log('next', operations);
      this.operations = operations;
    }, (err) => {
      console.log('error', err);
    });
  }

  getDateString(dateStr: string): string {
    const date = new Date(dateStr);
    const days = [
      'dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi',
      'vendredi', 'samedi'
    ];
    const months = [
      'janvier', 'février', 'mars', 'avril', 'mai',
      'juin', 'juillet', 'août', 'septembre',
      'octobre', 'november', 'décembre'
    ];
    const day = days[date.getUTCDay()];
    const dayNumber = date.getDate();
    const first = dayNumber === 1 ? 'er' : '';
    const month = months[date.getMonth()];
    const year = date.getUTCFullYear();
    return `Le ${day} ${dayNumber}${first} ${month} ${year}`;
  }

  updateEditMode(operation: any): void {
    operation.edit = !(operation.edit === true);
  }

  updateOperations(oldLength: number, newLength: number): void {
    console.log('passage de', oldLength, 'à', newLength);
    if (oldLength < newLength) { // Il faut en charger plus
      this.operationApiService.getOperations(oldLength + 1, newLength - oldLength, (operations: any) => {
        console.log('next', operations);
        if (operations.length === 0) {
          console.log('stop');
          this.tooMuch.emit();
        }
        for (const operation of operations) {
          this.operations.push(operation);
        }
      }, (err) => {
        console.log('error', err);
      });
    } else {
      for (let i = this.operations.length - 1; i >= newLength; i--) {
        this.operations.pop(this.operations[i]);
      }
    }
  }

}
