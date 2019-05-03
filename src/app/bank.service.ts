import { Injectable } from '@angular/core';
import { Account } from './account';
// import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {

    constructor() { }

    getBalance(account: Account): number {
        if(account.balance < 0) {
            throw new Error('balance is not valid with below 0')
        }
        else if(isNaN(account.balance)) {
            throw new Error('invalid balance, cant be NaN')
        }
        else if(account.balance === null) {
            throw new Error('balance cant be null')
        }
        else if(account.customerName !== account.customerName.trim()) {
            throw new Error('invalid customerName, remove whitespace');
        }
        else if(account.customerName === '') {
            throw new Error('invalid customerName, empty name')
        }
        return account.balance
    };

    deposit(account: Account, amount: number): void {
        if( !account )
            throw new Error('no account');
        else if( account.customerName === '') {
            throw new Error('invalid customerName, empty name')

        } else if( amount < 0) {
            throw new Error('not valid');
        } else if (amount === null) {
            throw new Error('not valid');
        } else if(isNaN(amount)) {
            throw new Error('not valid');
        }
        else if(account.customerName === null) {
            throw new Error('invalid account')
        }
        else {
            account.balance += amount
        }
    };

    withdraw(account: Account, amount: number): void {
        if(!account) {
            throw new Error('no account');
        }
        else if(amount < 0) {
            throw new Error('invalid withdraw, most be more than 0')
        }
        else if(amount > account.balance) {
            throw new Error('invalid withdraw, most be higher than balance')
        }
        else if(amount == null) {
            throw new Error('invalid withdraw, cant be null')
        }
        else if(isNaN(amount)){
            throw new Error('invalid withdraw, cant be NaN')
        }
        else if(account.customerName === null) {
            throw new Error('invalid account')
        }
        account.balance -= amount;
    };

    transfer(from: Account, to: Account, amount: number): void {
        if(amount < 0) {
            throw new Error('invalid transfer, amount most be more than 0')
        } else if (isNaN(amount)) {
            throw new Error('invalid transfer, cant be NaN')
        } else if (amount == null) {
            throw new Error('invalid transfer, cant be null')
        }
        else if( amount > from.balance) {
            throw new Error('invalid transfer, amount is higher than balance')
        }
        else if(from.customerName === '') {
            throw new Error('invalid transfer, customerName is invalid')
        }
        else if(from.balance < 0) {
            throw new Error('invalid transfer, balance is invalid')
        }
        else {
             from.balance -= amount;
             to.balance += amount;
        }
    };
};
