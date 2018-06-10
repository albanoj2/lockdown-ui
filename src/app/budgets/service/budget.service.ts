import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Budget, BudgetWithItems, BudgetItem, ActiveBudget } from '../domain/budget';
import { Service } from '../../common/service/service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    })
};
 
@Injectable({
    providedIn: 'root',
})
export class BudgetService extends Service<Budget> {

    private baseUrl = 'http://localhost:8080/budget';
 
    constructor(private http: HttpClient) {
        super();
    }

    protected findAll(): Observable<Budget[]> {
        return this.http.get<Budget[]>(this.baseUrl, httpOptions);
    }

    protected findById(id: string): Observable<Budget> {
        return this.http.get<Budget>(`${this.baseUrl}/${id}`, httpOptions);
    }

    protected createElement(element: Budget): Observable<Budget> {
        return this.http.post<Budget>(this.baseUrl, element, httpOptions);
    }

    protected updateElement(element: Budget): Observable<Budget> {
        return this.http.patch<Budget>(`${this.baseUrl}/${element.id}`, element, httpOptions);
    }

    protected deleteElement(element: Budget): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${element.id}`, httpOptions);
    }

    public getBudgets(): Observable<Budget[]> {
        return this.http.get<Budget[]>(this.baseUrl, httpOptions);
    }

    public createBudget(budget: Budget): Observable<Budget> {
        return this.http.post<Budget>(this.baseUrl, budget, httpOptions);
    }

    public findByIdWithItems(id: string): Promise<BudgetWithItems> {

        return new Promise((resolve, reject) => {
            Promise.all([
                this.findById(id).toPromise(),
                this.findItemsById(id).toPromise()
            ])
            .then(results => {
                let budgetWithItems = new BudgetWithItems(results[0], results[1]);
                resolve(budgetWithItems);
            });
        });
    }

    public findItemsById(id: string): Observable<BudgetItem[]> {
        return this.http.get<BudgetItem[]>(`${this.baseUrl}/${id}/item`);
    }

    public getActiveBudgets(): Promise<ActiveBudget[]> {
        return this.http.get<ActiveBudget[]>(`${this.baseUrl}/active`, httpOptions).toPromise();
    }
}