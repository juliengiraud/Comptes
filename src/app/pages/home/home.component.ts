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

  updateDate(operation: any, newDate: any): void {
    operation.date = newDate;
  }

  updateSigne(operation: any, newSigne: any): void {
    operation.montant = Math.abs(operation.montant);
    if (newSigne < 0) {
      operation.montant *= -1;
    }
  }

  updateMontant(operation: any, newMontant: any): void {
    operation.montant = newMontant;
  }

  updateCommentaire(operation: any, newCommentaire: any): void {
    operation.commentaire = newCommentaire;
  }

  updateRemboursable(operation: any, newRemboursable: any): void {
    operation.remboursable = newRemboursable ? '1' : '0';
  }

}
