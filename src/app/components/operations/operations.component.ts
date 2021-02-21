import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Operation } from 'src/app/model/operation.model';
import { OperationApiService } from 'src/app/services/api/operation.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit, OnDestroy {

  start = 0;
  length: number;
  operations: Array<Operation>;
  updateSubscriber: Subscription;

  @Input() updateEvent: Observable<void>;

  @Input() set length_(length: number) {
    if (this.operations != null) {
      this.updateLocalOperations(this.length, length);
    }
    this.length = length;
  }

  @Output() tooMuch: EventEmitter<void> = new EventEmitter();

  constructor(private operationApiService: OperationApiService) { }

  ngOnInit(): void {
    this.operationApiService.getByStartAndQuantity(this.start, this.length, (operations) => {
      console.log('next', operations);
      this.operations = operations;
    }, (err) => {
      console.log('error', err);
    });
    this.updateSubscriber = this.updateEvent.subscribe(() => this.ngOnInit());
  }

  ngOnDestroy(): void {
    this.updateSubscriber.unsubscribe();
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

  updateLocalOperations(oldLength: number, newLength: number): void {
    console.log('passage de', oldLength, 'à', newLength);
    if (oldLength < newLength) { // Il faut en charger plus
      this.operationApiService.getByStartAndQuantity(oldLength + 1, newLength - oldLength, (operations) => {
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
        this.operations.pop();
      }
    }
  }

  updateOnlineOperation($event: {operation: Operation, key: string, lastValue: any}): void {
    this.operationApiService.update($event.operation, () => {
    }, (err: any) => {
      $event.operation[$event.key] = $event.lastValue;
      console.log(err);
    });
  }

}
