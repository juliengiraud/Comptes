export class Operation {

    id: number;
    date: string;
    montant: string;
    commentaire: string;
    remboursable: string; // '0' ou '1' -> boolean MySQL
    updating = {
        date: false,
        montant: false,
        commentaire: false,
        remboursable: false,
        create: false,
        delete: false
    };

    constructor(data?: any) {
        this.id = data?.id;
        this.date = data?.date || new Date().toISOString().split('T')[0];
        this.montant = data?.montant;
        this.commentaire = data?.commentaire;
        this.remboursable = data?.remboursable || '0';
    }

    isValid(): boolean {
        return ![this.date, this.montant, this.commentaire, this.remboursable].includes(null)
            && ![this.date, this.montant, this.commentaire, this.remboursable].includes('');
    }

}
