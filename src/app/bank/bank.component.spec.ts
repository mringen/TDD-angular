import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BankComponent } from './bank.component';
import { FormsModule } from '@angular/forms'

describe('BankComponent', () => {
    let component: BankComponent;
    let fixture: ComponentFixture<BankComponent>;
    let domElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BankComponent ],
            imports: [FormsModule]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BankComponent);
        component = fixture.componentInstance;
        domElement = fixture.nativeElement;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show dom element accountCard with css-class accountBalance', () => {
        let accountCard = domElement.querySelector('.accountBalance');
        expect(accountCard).toBeTruthy()
    })
    it('should show dom element input, with class amount', () => {
        let inputField = domElement.querySelector('input')
        expect(inputField).toBeTruthy()
    })

    describe('function for deposit and withdraw', () => {
        it('should exist a function for deposit', () => {
            expect(component.depositMoney).toBeDefined();
        })
        it('should exist a function for withdraw', () => {
            expect(component.withdrawMoney).toBeDefined();
        })
        it('should be able to deposit money', () => {
            let fakeAccount = {
                customerName: 'Niclas H',
                balance: 2000
            };
            let balanceValue = fakeAccount.balance;
            let inputValue = 1000;
            let expectedValue = balanceValue + inputValue;
            let mockDataService = jasmine.createSpyObj(['deposit']);
            mockDataService.deposit.and.returnValue(expectedValue)
            let component = new BankComponent(mockDataService);
            component.account = fakeAccount;
            component.amount = inputValue;

            component.depositMoney()
            expect(mockDataService.deposit).toHaveBeenCalledWith(component.account, component.amount);
            //expect(component.account.balance).toBe(expectedValue);
        })

        it('should be able to withdraw money', () => {
            let fakeAccount = {
                customerName: 'Niclas H',
                balance: 2000
            };
            let balanceValue = fakeAccount.balance;
            let inputValue = 1000;
            let expectedValue = balanceValue - inputValue;
            let mockDataService = jasmine.createSpyObj(['withdraw']);
            mockDataService.withdraw.and.returnValue(expectedValue);
            let component = new BankComponent(mockDataService);
            component.account = fakeAccount;
            component.amount = inputValue;

            component.withdrawMoney();
            expect(mockDataService.withdraw).toHaveBeenCalledWith(component.account, component.amount)
        })
    })
});
