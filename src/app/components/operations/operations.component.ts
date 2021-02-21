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

  @Input() set updateEvent_(updateEvent: Observable<void>) {
    this.updateSubscriber = updateEvent.subscribe(() => this.ngOnInit());
  }

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
      this.operations = operations;
    });
  }

  ngOnDestroy(): void {
    if (this.updateSubscriber != null) {
      this.updateSubscriber.unsubscribe();
    }
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
    if (oldLength < newLength) { // Il faut en charger plus
      this.operationApiService.getByStartAndQuantity(oldLength + 1, newLength - oldLength, (operations) => {
        if (operations.length === 0) {
          this.tooMuch.emit();
        }
        for (const operation of operations) {
          this.operations.push(operation);
        }
      });
    } else {
      for (let i = this.operations.length - 1; i >= newLength; i--) {
        this.operations.pop();
      }
    }
  }

  checkUpdate($event?: {operation: Operation, key: string, lastValue: any}): void {
    if ($event != null) {
      this.updateOnlineOperation($event);
    } else {
      this.ngOnInit(); // delete
    }
  }

  updateOnlineOperation($event: {operation: Operation, key: string, lastValue: any}): void {
    this.operationApiService.update($event.operation, () => {
    }, (err) => {
      $event.operation[$event.key] = $event.lastValue;
    });
  }

}
