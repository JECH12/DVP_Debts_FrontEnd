import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DebtsService } from '../../../Services/debts.service';
import { Debt } from '../../../Interfaces/Debt';
import { NgClass, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-debt-detail',
  imports: [NgClass,CurrencyPipe, RouterModule],
  templateUrl: './debt-detail.component.html',
  styleUrl: './debt-detail.component.css'
})
export class DebtDetailComponent {
  debt = signal<Debt | null>(null);
  loading = signal(true);
  userId = signal(0);

  constructor(
    private route: ActivatedRoute,
    private debtsService: DebtsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('debtId'));
    this.userId.set(id);
    this.debtsService.GetDebtById(id).subscribe({
      next: (res) => {
        this.debt.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando detalle de deuda', err);
        this.loading.set(false);
      }
    });
  }
}
