import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { AccountComponent } from './accounts/account.component';
import { AccountDetailComponent } from './accounts/account-detail.component';
import { AccountDashboardComponent } from './accounts/account-dashboard.component';

const routes: Routes = [
    { path: 'budgets', component: BudgetsComponent },
    { path: 'budgets/:budgetId', component: BudgetsComponent },
    { path: 'accounts', component: AccountDashboardComponent },
    { path: 'accounts/:accountId', component: AccountDetailComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}