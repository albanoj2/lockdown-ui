import { OnInit, Component, Input } from "@angular/core";
import { Transaction } from "./domain/transaction";
import { FormControl } from "@angular/forms";
import { ActiveBudget } from "../budgets/domain/budget";
import { TransactionService } from "./service/transaction.service";


@Component({
    selector: '[transaction-row]',
    templateUrl: 'transaction-row.component.html',
    styleUrls: [
        'transaction-row.component.css'
    ]
})
export class TransactionRowComponent implements OnInit {
    
    @Input() private transaction: Transaction;
    @Input() private activeBudgets: ActiveBudget[];
    private budgetMappingControl = new FormControl();
    private mappingId: string;

    constructor(private transactionService: TransactionService) {}

    ngOnInit() {

        console.log(this.transaction)

        if (this.transaction.budgetItemIdMappings !== undefined) {
            this.mappingId = this.transaction.budgetItemIdMappings[0].budgetItemId;
            console.log(this.mappingId);
        }
        
    }

    private updateMapping() {
        this.transactionService.mapToSingleBudgetItem(this.transaction, this.mappingId)
            .then(transaction => this.transaction = transaction);
    }

    public get isUnmapped() {
        return this.mappingId === undefined;
    }
}