import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatSnackBarModule, MatButtonModule, MatListModule, MatIconModule, MatTableModule, MatDialogModule, MatRadioModule, MatTooltipModule, MatMenuModule, MatSelect, MatSelectModule, MatBadgeModule, MatChipsModule, MatPaginatorModule, MatProgressSpinnerModule, MatProgressSpinnerModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BudgetDetailComponent } from './budgets/budget-detail.component';
import { BudgetListComponent } from './budgets/budget-list.component';
import { NavbarComponent } from './navbar.component';
import { BudgetListEntryComponent } from './budgets/budget-list-entry.component';
import { BudgetComponent, BudgetSectionHeading } from './budgets/budget.component';
import { BudgetItemComponent } from './budgets/budget-item.component';
import { SaveBudgetItemDialog } from './budgets/dialog/save-budget-item.dialog.component';
import { DeleteDialog } from './common/dialog/delete.dialog.component';

import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { SaveBudgetDialog } from './budgets/dialog/save-budget.dialog.component';
import { AccountComponent } from './accounts/account.component';
import { TransactionRowComponent } from './accounts/transaction-row.component';
import { AccountDetailComponent } from './accounts/account-detail.component';
import { AccountListComponent } from './accounts/account-list.component';
import { AccountListEntryComponent } from './accounts/account-list-entry.component';
import { AccountDashboardComponent } from './accounts/account-dashboard.component';
import { AccountSplashComponent } from './accounts/account-splash.component';
import { BudgetDashboardComponent } from './budgets/budget-dashboard.component';
import { BudgetSplashComponent } from './budgets/budget-splash.component';
import { BudgetSpeedDialComponent } from './budgets/budget-speed-dial.component';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        BudgetDetailComponent,
        BudgetListComponent,
        BudgetListEntryComponent,
        BudgetComponent,
        BudgetSectionHeading,
        BudgetItemComponent,
        BudgetDashboardComponent,
        BudgetSplashComponent,
        BudgetSpeedDialComponent,
        AccountComponent,
        AccountDetailComponent,
        AccountListComponent,
        AccountListEntryComponent,
        AccountDashboardComponent,
        AccountSplashComponent,
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
        MatBadgeModule,
        MatChipsModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
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
