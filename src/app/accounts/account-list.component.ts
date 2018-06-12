import { Component, OnInit } from '@angular/core';
import { Account } from './domain/account';
import { AccountService } from './service/accounts.service';

@Component({
    selector: 'account-list',
    templateUrl: 'account-list.component.html'
})
export class AccountListComponent implements OnInit {

    private accounts: Account[];

    constructor(private accountService: AccountService) {}

    public ngOnInit() {
        this.loadAccounts();
    }

    private loadAccounts() {
        this.accountService.getAccounts()
            .then(accounts => this.accounts = accounts);
    }
}