import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Account } from './account';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    })
};
 
@Injectable({
    providedIn: 'root',
})
export class AccountService {

    private baseUrl = 'http://localhost:8080/account';
 
    constructor(private http: HttpClient) {}

    public getAccounts(): Observable<Account[]> {
        return this.http.get<Account[]>(this.baseUrl, httpOptions)
            .pipe(
                tap(
                    data => console.log(data),
                    error => console.error(error)
                )
            );
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
      }
}