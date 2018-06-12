import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Account } from '../domain/account';
import { Transaction } from '../domain/transaction';
import { Page } from '../../common/domain/page';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    })
};
 
@Injectable({
    providedIn: 'root',
})
export class TransactionService {

    private baseUrl = 'http://localhost:8080/account';
    private transactionUrl = 'http://localhost:8080/transaction';
 
    constructor(private http: HttpClient) {}

    public getTransactions(accountId: string, page: number = 0, size: number = 20, sort: string = 'DESC'): Promise<Page<Transaction>> {
        return new Promise((accept, reject) => {
            this.http.get<Transaction[]>(`${this.baseUrl}/${accountId}/transactions`, 
                {
                    params: TransactionService.toPageParams(page, size, sort), 
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    })
                })
                .toPromise()
                .then(jsonPage => {
                    let parsedPage = Page.fromJson(jsonPage, Transaction.fromJson);
                    accept(parsedPage);
                });
        });
    }

    private static toPageParams(page: number, size: number, sort: string): HttpParams {
        return new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString())
            .set('sort', sort);
    }

    public mapToSingleBudgetItem(transaction: Transaction, budgetItemId: string): Promise<Transaction> {
        return new Promise((accept, reject) => {
            this.http.patch(`${this.transactionUrl}/${transaction.id}/mapping/single`, {budgetItemId: budgetItemId}, httpOptions)
                .toPromise()
                .then(jsonTransaction => {
                    let transaction = Transaction.fromJson(jsonTransaction);
                    accept(transaction);
                });
        });
    }
}