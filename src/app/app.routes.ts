import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DebtsComponent } from './Debt/debts/debts.component';
import { DebtDetailComponent } from './Debt/debt-detail/debt-detail.component';
import { DebtCreateComponent } from './Debt/debt-create/debt-create.component';
import { PayComponent } from './pay/pay.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    { 
        path: 'myDebts', 
        component: DebtsComponent 
    },
    {
        path:'debt-detail/:debtId',
        component: DebtDetailComponent
    },
    {
        path:'createDebt',
        component: DebtCreateComponent
    }
    ,
    {
        path:'pay/:debtId',
        component: PayComponent
    }


];
