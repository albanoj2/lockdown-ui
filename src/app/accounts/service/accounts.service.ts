import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Account } from '../domain/account';

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

    public getAccounts(): Promise<Account[]> {
        return new Promise((accept, reject) => {
            this.http.get<Account[]>(this.baseUrl, httpOptions)
                .toPromise()
                .then(jsonAccounts => {
                    accept(jsonAccounts.map(Account.fromJson));
                });
        });
    }

    public getAccount(accountId: string): Promise<Account> {
        return new Promise((accept, reject) => {
            this.http.get<Account>(`${this.baseUrl}/${accountId}`, httpOptions)
                .toPromise()
                .then(jsonAccount => {
                    accept(Account.fromJson(jsonAccount));
                });
        });
    }
}