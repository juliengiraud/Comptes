import { Node } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Operation } from 'src/app/model/operation.model';
import { OperationApiService } from 'src/app/services/api/operation.service';

@Component({
  selector: 'app-operation-edit',
  templateUrl: './operation-edit.component.html',
  styleUrls: ['./operation-edit.component.scss']
})
export class OperationEditComponent implements OnInit {

  @Input() operation: Operation;
  @Input() id: string;
  @Input() showDelete: boolean;

  @Output() update: EventEmitter<any> = new EventEmitter();

  parseFloat = parseFloat;

  constructor(private operationApiService: OperationApiService) { }

  ngOnInit(): void {
  }

  eventAsValue(event: any): string {
    return event.target.value;
  }

  getNewMontantFromSigne(operation: Operation, newSigne: number): string {
    let newMontant = Math.abs(parseFloat(operation.montant));
    if (newSigne < 0) {
      newMontant *= -1;
    }
    return newMontant + '';
  }

  getNewRemboursable(remboursable: string): string {
    return remboursable === '1' ? '0' : '1';
  }

  updateParameter(operation: Operation, key: string, value: string): void {
    const lastValue = operation[key];
    operation[key] = value;
    this.update.emit({operation, key, lastValue});
  }

  deleteOperation(): void {
    this.operationApiService.delete(this.operation, () => {
      this.update.emit();
    });
  }

}
