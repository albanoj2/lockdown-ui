import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatSnackBarModule, MatButtonModule, MatListModule, MatIconModule, MatTableModule, MatDialogModule, MatRadioModule, MatTooltipModule, MatMenuModule, MatSelect, MatSelectModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AccountsComponent } from './accounts/accounts.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { BudgetListComponent } from './budgets/budget-list.component';
import { NavbarComponent } from './navbar.component';
import { BudgetListEntryComponent } from './budgets/budget-list-entry.component';
import { BudgetComponent } from './budgets/budget.component';
import { BudgetItemComponent } from './budgets/budget-item.component';
import { SaveBudgetItemDialog } from './budgets/dialog/save-budget-item.dialog.component';
import { DeleteDialog } from './common/dialog/delete.dialog.component';

import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { SaveBudgetDialog } from './budgets/dialog/save-budget.dialog.component';
import { AccountComponent } from './accounts/account.component';
import { TransactionRowComponent } from './accounts/transaction-row.component';


@NgModule({
    declarations: [
        AppComponent,
        AccountsComponent,
        NavbarComponent,
        BudgetsComponent,
        BudgetListComponent,
        BudgetListEntryComponent,
        BudgetComponent,
        BudgetItemComponent,
        AccountComponent,
        TransactionRowComponent,
        SaveBudgetItemDialog,
        SaveBudgetDialog,
        DeleteDialog
    ],
    imports: [
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatSnackBarModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        MatTableModule,
        MatDialogModule,
        MatRadioModule,
        MatTooltipModule,
        MatMenuModule,
        MatSelectModule,
        EcoFabSpeedDialModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    entryComponents: [
        SaveBudgetItemDialog,
        SaveBudgetDialog,
        DeleteDialog
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
