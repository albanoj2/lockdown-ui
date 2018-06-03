import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { BudgetsComponent } from './budgets/budgets.component';

const routes: Routes = [
    { path: 'accounts', component: AccountsComponent },
    { path: 'budgets', component: BudgetsComponent },
    { path: 'budgets/:budgetId', component: BudgetsComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}