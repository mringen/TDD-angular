import { Component, OnInit } from '@angular/core';
import { Account } from '../account'
import { BankService } from '../bank.service'

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
    account: Account = {customerName: 'Niclas H', balance: 3000};
    amount: number;

    constructor( private bankService: BankService) { }


    ngOnInit() { }


    depositMoney() {
        this.bankService.deposit(this.account, this.amount)
    };


    withdrawMoney() {
        this.bankService.withdraw(this.account, this.amount)
    };

}
