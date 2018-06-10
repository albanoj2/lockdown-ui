import { Component, OnInit } from '@angular/core';
import { AccountService } from './service/accounts.service';
import { Account } from './domain/account';

@Component({
    selector: 'accounts',
    templateUrl: 'accounts.component.html'
})
export class AccountsComponent implements OnInit {

    private accounts: Account[] = [];

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.getAccounts();
    }

    private getAccounts() {
        this.accountService.getAccounts()
            .subscribe(accounts => this.accounts = accounts);
    }
}