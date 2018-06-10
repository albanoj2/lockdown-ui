import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Account } from '../domain/account';
import { Transaction } from '../domain/transaction';

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

    public getTransactions(accountId: string): Promise<Transaction[]> {
        return new Promise((accept, reject) => {
            this.http.get<Transaction[]>(`${this.baseUrl}/${accountId}/transactions`, httpOptions)
                .toPromise()
                .then(jsonTransactions => {
                    let transactions = jsonTransactions.map(jsonTransaction => Transaction.fromJson(jsonTransaction));
                    accept(transactions);
                });
        });
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