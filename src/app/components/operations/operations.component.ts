import { Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Operation } from 'src/app/model/operation.model';
import { OperationApiService } from 'src/app/services/api/operation.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-operations',
    templateUrl: './operations.component.html',
    styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit, OnDestroy {

    @HostBinding('class') class = 'scroll-tab';

    start = 0;
    length: number;
    operations: Array<Operation>;

    updateSubscriber: Subscription;

    @Input() set updateEvent_(updateEvent: Subject<void>) {
        if (updateEvent != null && this.updateSubscriber == null) {
            this.updateSubscriber = updateEvent.subscribe(() => {
                this.ngOnInit();
            });
        }
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
            this.operations = operations.map((o) => new Operation(o));
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

    updateLocalOperations(oldLength: number, newLength: number): void {
        if (oldLength < newLength) { // Il faut en charger plus
            this.operationApiService.getByStartAndQuantity(oldLength + 1, newLength - oldLength, (operations) => {
                if (operations.length === 0) {
                    this.tooMuch.emit();
                }
                for (const operation of operations) {
                    this.operations.push(new Operation(operation));
                }
            });
        } else {
            for (let i = this.operations.length - 1; i >= newLength; i--) {
                this.operations.pop();
            }
        }
    }

    updateOperation(operation: Operation, key: string, event: string): void {
        const newValue = event;
        const lastValue = operation[key];
        if (lastValue === newValue) {
            return;
        }
        operation[key] = newValue;
        if (key === 'montant') {
            operation.montant = parseFloat(newValue).toFixed(2);
        }
        operation.updating[key] = true;
        this.operationApiService.update(operation, () => {
        }, (err) => {
            console.log(err);
            operation[key] = lastValue;
        }, () => {
            operation.updating[key] = false;
        });
    }

    eventAsValue(event: any): string {
        return event.target.value;
    }

    getNewRemboursable(remboursable: string): string {
        return remboursable === '1' ? '0' : '1';
    }

    deleteOperation(operation: Operation): void {
        Swal.fire({
            title: 'Attention',
            html: 'Êtes-vous sûr de vouloir supprimer cette opération ?',
            icon: 'warning',
            confirmButtonText: 'Oui',
            denyButtonText: 'Non',
            showDenyButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                operation.updating.delete = true;
                this.operationApiService.delete(operation, () => {
                    this.ngOnInit();
                });
            }
        });
    }

    addNewLine(operation: Operation): void {
        Swal.fire({
            title: 'Nouvelle opération',
            html: this.getNewOperationForm(operation),
            confirmButtonText: 'Valider',
            focusConfirm: false,
            preConfirm: () => {
                const date = (Swal.getPopup().querySelector('#swal-date-input') as any).value;
                const amount = (Swal.getPopup().querySelector('#swal-amount-input') as any).value;
                const comment = (Swal.getPopup().querySelector('#swal-comment-input') as any).value;
                const refund = (Swal.getPopup().querySelector('#swal-refund-input') as any).checked;
                if (!date || !amount || !comment) {
                    Swal.showValidationMessage(`Veuillez remplir tous les champs`);
                }
                return { date, montant: parseFloat(amount), commentaire: comment, remboursable: refund ? '1' : '0' };
            }
        }).then((result: any) => {
            const newOperation = new Operation(result.value);
            operation.updating.create = true;
            this.operationApiService.create(newOperation, () => {
                this.ngOnInit();
            });
        });
    }

    getNewOperationForm(operation: Operation): string {
        const dateId = 'swal-date-input';
        const amountId = 'swal-amount-input';
        const commentId = 'swal-comment-input';
        const refundId = 'swal-refund-input';
        return `<div class="swal-form-input">
                  <label for="${dateId}">Date</label><br>
                  <input type="date" id="${dateId}" class="swal2-input" value="${operation.date}">
                </div>
                <div class="swal-form-input">
                  <label for="${amountId}">Montant</label><br>
                  <input type="number" step="0.01" id="${amountId}" class="swal2-input">
                </div>
                <div class="swal-form-input">
                  <label for="${commentId}">Commentaire</label><br>
                  <input type="text" id="${commentId}" class="swal2-input">
                </div>
                <div class="swal-form-input">
                  <label for="${refundId}">Remboursable</label><br>
                  <input type="checkbox" id="${refundId}" class="swal2-input">
                </div>`;
    }
}
