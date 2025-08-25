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

  constructor(
    private route: ActivatedRoute,
    private debtsService: DebtsService
  ) {}

  ngOnInit(): void {
    const debtid = Number(this.route.snapshot.paramMap.get('debtId'));
    this.debtsService.GetDebtById(debtid).subscribe({
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
