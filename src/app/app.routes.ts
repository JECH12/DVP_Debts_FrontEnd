import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DebtsComponent } from './debts/debts.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    { 
        path: 'myDebts/:userId', 
        component: DebtsComponent 
    }

];
