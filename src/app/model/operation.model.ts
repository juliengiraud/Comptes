export class Operation {

  id: number;
  date: string;
  montant: string;
  commentaire: string;
  remboursable: string; // '0' ou '1' -> boolean MySQL
  editing = false;

  constructor() {
    this.id = null;
    this.date = new Date().toISOString().split('T')[0];
    this.montant = null;
    this.commentaire = null;
    this.remboursable = '0';
  }

  isValid(): boolean {
    return ![this.date, this.montant, this.commentaire, this.remboursable].includes(null)
        && ![this.date, this.montant, this.commentaire, this.remboursable].includes('');
  }

}
