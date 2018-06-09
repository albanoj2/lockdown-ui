import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of, from, Subject, OperatorFunction } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Budget, BudgetWithItems, BudgetItem } from '../domain/budget';
import { Service } from '../../common/service/service';
import { BudgetSnapshot } from '../domain/budget-snapshot';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    })
};
 
@Injectable({
    providedIn: 'root',
})
export class BudgetItemService {

    private changedSubjects = {};
    private baseUrl = 'http://localhost:8080/budget';
 
    constructor(private http: HttpClient) {}

    public create(budgetId: string, item: BudgetItem): Promise<BudgetItem> {
        return new Promise((accept, reject) => {
            this.http.post<BudgetItem>(`${this.baseUrl}/${budgetId}/item`, item, httpOptions)
                .subscribe(createdItem => {
                    this.changedSubjectFor(budgetId).next();
                    accept(createdItem);
                });
        });
    }

    public delete(budgetId: string, item: BudgetItem): Promise<BudgetItem> {
        return new Promise((accept, reject) => {
            this.http.delete<BudgetItem>(`${this.baseUrl}/${budgetId}/item/${item.id}`, httpOptions)
                .subscribe(_ => {
                    this.changedSubjectFor(budgetId).next();
                    accept(item);
                });
        });
    }

    public update(budgetId: string, item: BudgetItem): Promise<BudgetItem> {
        return new Promise((accept, reject) => {
            this.http.put<BudgetItem>(`${this.baseUrl}/${budgetId}/item/${item.id}`, item, httpOptions)
                .subscribe(updatedItem => {
                    this.changedSubjectFor(budgetId).next();
                    accept(updatedItem);
                });
        });
    }

    public onBudgetItemsChanged(budgetId: string): Subject<void> {
        return this.changedSubjectFor(budgetId);
    }

    private changedSubjectFor(budgetId: string) {
        if (this.changedSubjects[budgetId] === undefined) {
            this.changedSubjects[budgetId] = new Subject<void>();
        }

        return this.changedSubjects[budgetId];
    }
}