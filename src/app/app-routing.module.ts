import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { BudgetDetailComponent } from './budgets/budget-detail.component';
import { AccountComponent } from './accounts/account.component';
import { AccountDetailComponent } from './accounts/account-detail.component';
import { AccountDashboardComponent } from './accounts/account-dashboard.component';
import { BudgetDashboardComponent } from './budgets/budget-dashboard.component';

const routes: Routes = [
    { path: 'budgets', component: BudgetDashboardComponent },
    { path: 'budgets/:budgetId', component: BudgetDetailComponent },
    { path: 'accounts', component: AccountDashboardComponent },
    { path: 'accounts/:accountId', component: AccountDetailComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}