import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatSnackBarModule, MatButtonModule, MatListModule, MatIconModule, MatTableModule, MatDialogModule, MatRadioModule, MatTooltipModule } from '@angular/material';
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
import { CreateBudgetItemDialog } from './budgets/dialog/create-budget-item.dialog.component';
import { DeleteBudgetDialog } from './budgets/dialog/delete-budget.dialog.component';

import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { CreateBudgetDialog } from './budgets/dialog/create-budget.dialog.component';

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
        CreateBudgetItemDialog,
        CreateBudgetDialog,
        DeleteBudgetDialog
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
        EcoFabSpeedDialModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    entryComponents: [
        CreateBudgetItemDialog,
        CreateBudgetDialog,
        DeleteBudgetDialog
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
