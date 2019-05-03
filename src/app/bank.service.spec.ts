import { TestBed } from '@angular/core/testing';

import { BankService } from './bank.service';
import { Account } from './account'

describe('BankService', () => {
    let service: BankService
    let account: Account
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(BankService);
        account = {
            customerName: 'Niclas H',
            balance: 5000,
        };
    });

    it('should be created', () => {
        const service: BankService = TestBed.get(BankService);
        expect(service).toBeTruthy();
    });

    let from: Account;
    let to: Account;
    let amount = 100;

    describe('Account balance', () => {
        it('should return balance as a number', () => {
            let fakeAccount = {customerName: 'Niclas H', balance: 3000,};
            expect(fakeAccount).toBeTruthy()
        })
        it('should throw error if balance is below 0 ', () => {
            let failAccount = {customerName: 'Niclas H', balance: -1,};
            let danger = () => {service.getBalance(failAccount)}
            expect(danger).toThrow();
        })
        it('should throw error if balance is NaN', () => {
            let failAccount = {customerName: 'Niclas H', balance: NaN,};
            let danger = () => {service.getBalance(failAccount)}
            expect(danger).toThrow();
        })
        it('should throw error if balance is null', () => {
            let failAccount = {customerName: 'Niclas H', balance: null,};
            let danger = () => {service.getBalance(failAccount)}
            expect(danger).toThrow();
        })
        it('should throw error if invalid customerName have whitespace', () => {
            let failAccount1 = {customerName: ' Niclas H ', balance: 3000};
            let danger = () => service.getBalance(failAccount1);
            expect(danger).toThrow();
        })
        it('should throw error if invalid customerName is empty string', () => {
            let failAccount2 = {customerName: '', balance: 3000};
            let danger = () => service.getBalance(failAccount2);
            expect(danger).toThrow();
        })
    })
    describe('Account deposit', () => {

        it('should exist a function that make a deposit', ()  => {
            //service.deposit(account, amount);
            expect(service.deposit).toBeDefined();
        })
        it('should update balance', () => {
            let amount = 200;
            let validAccount = {customerName: 'Niclas', balance: 3000};
            let newBalance = validAccount.balance + amount;
            service.deposit(validAccount, amount);  // act
            let actual = service.getBalance(validAccount)
            expect(actual).toBe(newBalance);  // assert

        })
        it('should throw error if account is null', () => {
            let danger = () => service.deposit(null, 500);
            expect(danger).toThrow()
        })
        it('should throw error if customerName is empty string', () => {
            let failAccount1 = {customerName: '', balance: 3000};
            let danger = () => service.deposit(failAccount1, amount);
            expect(danger).toThrow();
        })
        it('should throw error if amount is below 0', () => {
            let amount = -1;
            let danger = () => {service.deposit(account, amount);}
            expect(danger).toThrow()
        })
        it('should throw error if amount is null', () => {
            let amount = null;
            let danger = () => {service.deposit(account, amount);}
            expect(danger).toThrow();
        })
        it('should throw error if amount is NaN', () => {
            let amount = NaN;
            let danger = () => {service.deposit(account, amount);}
            expect(danger).toThrow()
        })
        it('should throw error if invalid account, to customerName', () => {
            let failAccount = { customerName: null, balance: 3000};
            let danger = () => service.deposit(failAccount, amount)
            expect(danger).toThrow()
        })
    })

    describe('Test Withdraw', () => {
        it('should exist a function than make withdraw', () => {
            //let actual = service.withdraw(account, amount);
            expect(service.withdraw).toBeDefined()
        })
        it('should update balance', () => {
            let amount = 200;
            let validAccount = {customerName: 'Niclas', balance: 3000};
            let newBalance = validAccount.balance - amount;
            service.withdraw(validAccount, amount);  // act
            let actual = service.getBalance(validAccount)
            expect(actual).toBe(newBalance);  // assert
        })

        it('should throw error if amount is below 0', () => {
            let amount = -1;
            let danger = () => {service.withdraw(account, amount);}
            expect(danger).toThrow()
        })
        it('should throw error if amount is higher than balance', () => {
            let amount = 5001;
            let danger = () => {service.withdraw(account, amount);}
            expect(danger).toThrow()
        })
        it('should throw error if amount is null', () => {
            let amount = null;
            let danger = () => {service.withdraw(account, amount);}
            expect(danger).toThrow()
        })
        it('should throw error if amount is NaN', () => {
            let amount = NaN;
            let danger = () => {service.withdraw(account, amount);}
            expect(danger).toThrow()
        })
        it('should throw error if invalid account, to customerName', () => {
            let failAccount = { customerName: null, balance: 3000};
            let danger = () => service.withdraw(failAccount, amount)
            expect(danger).toThrow()
        })
    });
    describe('Testing transfer', () => {
        let from = { customerName: 'Niclas H', balance: 3000 };
        let to = { customerName: 'Niclas H', balance: 2500 };

        it('should exist a function that make transfer', () => {
            let actual = service.transfer(from, to, amount)
            expect(actual).toBe(actual);
        })
        it('should update balance from account', () => {
            let amount = 200;
            let validFromAccount = {customerName: 'Niclas', balance: 3000};
            let validToAccount = {customerName: 'Niclas', balance: 3000};
            let newBalanceFrom = validFromAccount.balance - amount;
            let newBalanceTo = validToAccount.balance + amount;
            service.transfer(validFromAccount, validToAccount, amount);  // act
            let actualFrom = service.getBalance(validFromAccount)
            let actualTo = service.getBalance(validToAccount)
            expect(actualFrom).toBe(newBalanceFrom);  // assert
            expect(actualTo).toBe(newBalanceTo);
        })

        it('should throw error if amount is below 0', () => {
            let amount = -1;
            let danger = () => {service.transfer(from, to, amount)};
            expect(danger).toThrow()
        })
        it('should throw error if amount is NaN', () => {
            let amount = NaN;
            let danger = () => {service.transfer(from, to, amount);}
            expect(danger).toThrow()
        })
        it('should throw error if amount is null', () => {
            let amount = null;
            let danger = () => {service.transfer(from, to, amount);}
            expect(danger).toThrow()
        })

        it('should throw error if amount is higher than from', () => {
            let amount = 3001;
            let danger = () => {service.transfer(from, to, amount)}
            expect(danger).toThrow()
        })
        it('should throw error if invalid from account customerName', () => {
            let failFromAccount1 = { customerName: '', balance: 2500 };
            let danger = () => {service.transfer(failFromAccount1, to, amount);}
            expect(danger).toThrow()
        })
        it('should throw error if invalid to account customerName', () => {
            let failToAccount1 = { customerName: '', balance: -1 };
            let danger = () => {service.transfer(failToAccount1, to, amount);}
            expect(danger).toThrow()
        })
        it('should throw error if invalid from account balance', () => {
            let failFromAccount2 = { customerName: 'Niclas H', balance: -1 };
            let danger = () => {service.transfer(failFromAccount2, to, amount);}
            expect(danger).toThrow()
        })
        it('should throw error if invalid to account balance', () => {
            let failToAccount2 = { customerName: 'Niclas H', balance: -1 };
            let danger = () => {service.transfer(failToAccount2, to, amount);}
            expect(danger).toThrow()
        })
    })

});
