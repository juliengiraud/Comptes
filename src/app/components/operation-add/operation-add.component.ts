import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Operation } from 'src/app/model/operation.model';
import { OperationApiService } from 'src/app/services/api/operation.service';

@Component({
  selector: 'app-operation-add',
  templateUrl: './operation-add.component.html',
  styleUrls: ['./operation-add.component.scss']
})
export class OperationAddComponent implements OnInit {

  operation: Operation = new Operation();

  @Output() update: EventEmitter<void> = new EventEmitter();

  constructor(private operationApiService: OperationApiService) { }

  ngOnInit(): void {
  }

  createOperation(): void {
    if (!this.operation.isValid()) { // Cas impossible normalement
      return;
    }

    this.operationApiService.create(this.operation, () => {
      this.update.emit();
      this.operation = new Operation();
    }, (err: any) => {
      console.log(err);
    });
  }

}
