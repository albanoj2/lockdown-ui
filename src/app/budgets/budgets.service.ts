import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Budget } from './budget';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    })
};
 
@Injectable({
    providedIn: 'root',
})
export class BudgetService {

    private baseUrl = 'http://localhost:8080/budget';
 
    constructor(private http: HttpClient) {}

    public getBudgets(): Observable<Budget[]> {
        return this.http.get<Budget[]>(this.baseUrl, httpOptions);
    }

    public createBudget(budget: Budget): Observable<Budget> {
        return this.http.post<Budget>(this.baseUrl, budget, httpOptions);
    }
}