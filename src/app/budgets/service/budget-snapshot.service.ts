import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of, from } from 'rxjs';
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
export class BudgetSnapshotService {

    private baseUrl = 'http://localhost:8080/budget';
 
    constructor(private http: HttpClient) {}

    public findById(budgetId: string): Observable<BudgetSnapshot> {
        return this.http.get<BudgetSnapshot>(`http://localhost:8080/budget/${budgetId}/snapshot`, httpOptions);
    }
}