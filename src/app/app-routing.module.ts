import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { AccountComponent } from './accounts/account.component';

const routes: Routes = [
    { path: 'budgets', component: BudgetsComponent },
    { path: 'budgets/:budgetId', component: BudgetsComponent },
    { path: 'accounts', component: AccountsComponent },
    { path: 'accounts/:accountId', component: AccountComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}