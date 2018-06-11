import { Component, Input } from '@angular/core';
import { Account } from './domain/account';

@Component({
    selector: 'account-list-entry',
    templateUrl: 'account-list-entry.component.html'
})
export class AccountListEntryComponent {

    @Input() account: Account;
}
