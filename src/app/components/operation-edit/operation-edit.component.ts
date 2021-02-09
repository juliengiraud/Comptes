import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-operation-edit',
  templateUrl: './operation-edit.component.html',
  styleUrls: ['./operation-edit.component.scss']
})
export class OperationEditComponent implements OnInit {

  @Input() operation: any;
  @Input() id: number;

  constructor() { }

  ngOnInit(): void {
  }

  getNewMontantFromSigne(operation: any, newSigne: number): number {
    let newMontant = Math.abs(operation.montant);
    if (newSigne < 0) {
      newMontant *= -1;
    }
    return newMontant;
  }

  getNewRemboursable(remboursable: boolean): string {
    return remboursable ? '1' : '0';
  }

  updateParameter(operation: any, key: string, value: any): void {
    operation[key] = value;
    // this.operationApiService.update(operation, () => {
    //   console.log('update done');
    // }, (err: any) => {
    //   console.log(err);
    // });
  }

}
