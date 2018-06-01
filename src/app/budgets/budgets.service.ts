import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Budget } from './budget';
import { Service } from '../service/service';

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
        return this.http.put<Budget>(`${this.baseUrl}/${element.id}`, element, httpOptions);
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
}