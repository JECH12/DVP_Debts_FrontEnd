import { Component, inject, signal } from '@angular/core';
import { DebtDto } from '../../../Interfaces/Debtor';
import { DebtsService } from '../../../Services/debts.service';
import { GetDebtsDto } from '../../../Interfaces/GetDebts';
import { NgClass } from '@angular/common';
import { DebtState } from '../../../Enums/DebtState';
import { forkJoin } from 'rxjs';
import { LocalStorageService } from '../../../Services/local-storage.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-debts',
  imports: [NgClass,RouterModule],
  templateUrl: './debts.component.html',
  styleUrl: './debts.component.css'
})
export class DebtsComponent {
  private debtsService = inject(DebtsService)
  private localStorageService = inject(LocalStorageService);
  view = signal<'myDebts' | 'owedToMe'>('myDebts');

  userDebts = signal<DebtDto[]>([]);
  debtors = signal<DebtDto[]>([]);

  states = [
    { id: DebtState.Pendiente, name: 'Pendiente' },
    { id: DebtState.ParcialmentePagada, name: 'Parcialmente Pagada' },
    { id: DebtState.Pagada, name: 'Pagada' }
  ];

  userId = signal(0);

  ngOnInit(): void {
      const id = this.localStorageService.getItem("userId")

      if(id){
        this.userId.set(+id);
        this.loadDebts(+id);
      }
    
  }

   loadDebts(userId: number) {
    const debtorDto: GetDebtsDto = {
      userId: userId,
      type: 1,
      state:0
    };

    const creditorDto: GetDebtsDto = {
      userId: userId,
      type:2,
      state:0
    };

    this.callDebts(debtorDto, creditorDto);
  }

   onStateChange(event: Event) {
    const value = Number((event.target as HTMLSelectElement).value);
    const debtorDto: GetDebtsDto = {
      userId: this.userId(),
      type: 1,
      state:value
    };
    const creditorDto: GetDebtsDto = {
      userId: this.userId(),
      type: 2,
      state:value
    };

    this.callDebts(debtorDto, creditorDto);
  }

  getStateClass(state: number): string {
    switch (state) {
      case 1:
        return 'bg-warning text-dark';
      case 2:
        return 'bg-info text-dark';
      case 3:
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  }

  callDebts(debtorDto:GetDebtsDto, creditorDto:GetDebtsDto){
    forkJoin({
      userDebts: this.debtsService.GetDebts(debtorDto),
      debtors: this.debtsService.GetDebts(creditorDto)
    }).subscribe({
      next: ({ userDebts, debtors }) => {
        this.userDebts.set(userDebts);
        this.debtors.set(debtors);
      },
      error: (err) => {
        console.error('Error cargando deudas', err);
      }
    });
  }
}
