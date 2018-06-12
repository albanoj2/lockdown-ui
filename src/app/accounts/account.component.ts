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
    templateUrl: 'account.component.html',
    styleUrls: [
        'account.component.css'
    ]
})
export class AccountComponent implements OnInit {

    private account: Account;
    private accountId: string;
    private transactions: Transaction[] = [];
    private activeBudgets: ActiveBudget[] = [];
    private paramsSubscription: Subscription;
    private defaultPageSize: number = 20;
    private totalNumberOfTransactions: number = 0;
    private pageSizeOptions = [10, 15, 20, 25, 50];

    private currentPageIndex = 0;
    private currentPageSize = this.defaultPageSize;
    private isOverlayVisible = true;

    constructor(
        private accountService: AccountService,
        private transactionService: TransactionService,
        private budgetService: BudgetService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.paramsSubscription = this.route.params.subscribe(params => {
            this.accountId = params['accountId'];
            this.accountService.getAccount(this.accountId)
                .then(account => this.account = account);
            this.loadTransactions();
        });

        this.budgetService.getActiveBudgets()
            .then(activeBudgets => {
                this.activeBudgets = activeBudgets;
            });
    }

    private loadTransactions() {

        if (this.accountId !== undefined) {
            this.turnOnOverlay();
            this.transactionService.getTransactions(this.accountId, this.currentPageIndex, this.currentPageSize)
                .then(page => {
                    this.transactions = page.content;
                    this.totalNumberOfTransactions = page.totalElements;
                    this.turnOffOverlay();
                });
        }
    }

    public onPaginationChange(event: any) {
        console.log("Changed page")
        console.log(event)
        this.currentPageIndex = event.pageIndex;
        this.currentPageSize = event.pageSize;
        this.loadTransactions();
    }

    public turnOnOverlay() {
        this.isOverlayVisible = true;
    }

    public turnOffOverlay() {
        this.isOverlayVisible = false;
    }

    public get sortedTransactions() {
        return this.transactions.sort((a, b) => b.timestamp - a.timestamp);
    }

    public asDecimal(amount: number) {
        return amount / 100.0;
    }
}