import { Component, OnInit } from '@angular/core';
import { AccountService } from './service/accounts.service';
import { Account } from './domain/account';
import { Transaction } from './domain/transaction';
import { TransactionService } from './service/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BudgetService } from '../budgets/service/budget.service';
import { ActiveBudget } from '../budgets/domain/budget';

@Component({
    selector: 'account',
    templateUrl: 'account.component.html'
})
export class AccountComponent implements OnInit {

    private accountId;
    private transactions: Transaction[] = [];
    private activeBudgets: ActiveBudget[] = [];
    private paramsSubscription: Subscription;

    constructor(
        private transactionService: TransactionService,
        private budgetService: BudgetService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.paramsSubscription = this.route.params.subscribe(params => {
            this.accountId = params['accountId'];
            this.getTransactions();
        });

        this.budgetService.getActiveBudgets()
            .then(activeBudgets => {
                this.activeBudgets = activeBudgets;
                console.log(this.activeBudgets);
            });
    }

    private getTransactions() {

        if (this.accountId !== undefined) {
            this.transactionService.getTransactions(this.accountId)
                .then(transactions => {
                    this.transactions = transactions;
                    console.log(this.transactions);
                });
        }
    }

    public get sortedTransactions() {
        return this.transactions.sort((a, b) => b.timestamp - a.timestamp);
    }

    public asDecimal(amount: number) {
        return amount / 100.0;
    }
}