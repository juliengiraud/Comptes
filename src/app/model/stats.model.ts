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

    constructor(data?: { [key: string]: string}) {
        // Annuel
        this.alwaysTotal = new Stat(
            'Bilan total',
            data?.always_total
        );
        this.alwaysPersonnalTotal = new Stat(
            'Bilan perso',
            data?.always_personnal_total
        );
        this.alwaysTotalInput = new Stat(
            'Total des entrées',
            data?.always_total_input
        );
        this.alwaysTotalOutput = new Stat(
            'Total des sorties',
            data?.always_total_output
        );
        this.alwaysWaitingRefundOutput = new Stat(
            // tslint:disable-next-line:quotemark
            "Total qu'on me doit",
            data?.always_waiting_refund_output
        );
        this.alwaysWaitingRefundCount = new Stat(
            'Remboursements en attente',
            data?.always_waiting_refund_count,
            true
        );

        // Mensuel
        this.monthTotal = new Stat(
            'Bilan du mois',
            data?.month_total
        );
        this.monthPersonnalTotal = new Stat(
            'Bilan perso du mois',
            data?.month_personnal_total
        );
        this.monthInput = new Stat(
            'Entrées du mois',
            data?.month_input
        );
        this.monthOutput = new Stat(
            'Sorties du mois',
            data?.month_output
        );
        this.monthWaitingRefundOutput = new Stat(
            'Ce mois on me doit',
            data?.month_waiting_refund_output
        );
        this.monthWaitingRefundCount = new Stat(
            'Remboursements en attente',
            data?.month_waiting_refund_count,
            true
        );
        this.monthTotalSinceAlways = new Stat(
            'Bilan total',
            data?.month_total_since_always
        );
        this.monthTotalSinceCurrentYear = new Stat(
            'Bilan annuel',
            data?.month_total_since_current_year
        );
    }

}
