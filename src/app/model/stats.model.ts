import { Stat } from './stat.model';

export class Stats {

    // Annuel
    alwaysTotal: Stat;
    alwaysPersonnalTotal: Stat;
    alwaysTotalInput: Stat;
    alwaysTotalOutput: Stat;
    alwaysWaitingRefundOutput: Stat;
    alwaysWaitingRefundCount: Stat;

    // Mensuel
    monthTotal: Stat;
    monthPersonnalTotal: Stat;
    monthInput: Stat;
    monthOutput: Stat;
    monthWaitingRefundCount: Stat;
    monthWaitingRefundOutput: Stat;
    monthTotalSinceAlways: Stat;
    monthTotalSinceCurrentYear: Stat;

    constructor(data?: { [key: string]: number}) {
        // Annuel
        this.alwaysTotal = new Stat(
            'Bilan total',
            data?.always_total || 0
        );
        this.alwaysPersonnalTotal = new Stat(
            'Bilan perso',
            data?.always_personnal_total || 0
        );
        this.alwaysTotalInput = new Stat(
            'Total des entrées',
            data?.always_total_input || 0
        );
        this.alwaysTotalOutput = new Stat(
            'Total des sorties',
            data?.always_total_output || 0
        );
        this.alwaysWaitingRefundOutput = new Stat(
            // tslint:disable-next-line:quotemark
            "Total qu'on me doit",
            data?.always_waiting_refund_output || 0
        );
        this.alwaysWaitingRefundCount = new Stat(
            'Remboursements en attente',
            data?.always_waiting_refund_count || 0
        );

        // Mensuel
        this.monthTotal = new Stat(
            'Bilan du mois',
            data?.month_total || 0
        );
        this.monthPersonnalTotal = new Stat(
            'Bilan perso du mois',
            data?.month_personnal_total || 0
        );
        this.monthInput = new Stat(
            'Entrées du mois',
            data?.month_input || 0
        );
        this.monthOutput = new Stat(
            'Sorties du mois',
            data?.month_output || 0
        );
        this.monthWaitingRefundCount = new Stat(
            'Ce mois on me doit',
            data?.month_waiting_refund_count || 0
        );
        this.monthWaitingRefundOutput = new Stat(
            'Remboursements en attente',
            data?.month_waiting_refund_output || 0
        );
        this.monthTotalSinceAlways = new Stat(
            'Bilan total',
            data?.month_total_since_always || 0
        );
        this.monthTotalSinceCurrentYear = new Stat(
            'Bilan annuel',
            data?.month_total_since_current_year || 0
        );
    }

}
