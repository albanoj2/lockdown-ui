import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AccountsComponent } from './accounts/accounts.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { BudgetListComponent } from './budgets/budget-list.component';

@NgModule({
    declarations: [
        AppComponent,
        AccountsComponent,
        BudgetsComponent,
        BudgetListComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
