export class Stat {

    caption: string;
    amount: string;

    constructor(caption: string, amount: string, isInt?: boolean) {
        this.caption = caption;
        const amountValue = parseFloat(amount);
        if (isNaN(amountValue)) {
            this.amount = null;
        } else {
            this.amount = amountValue.toLocaleString('fr-FR').replace(',', '.');
            const length = this.amount.length;
            if (length > 2 && this.amount[length - 2] === '.') {
                this.amount += '0';
            }
        }

    }

}
