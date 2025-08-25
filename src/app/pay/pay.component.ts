import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DebtDetailComponent } from '../Debt/debt-detail/debt-detail.component';
import { PaymentService } from '../../Services/payment.service';
import { PaymentDto } from '../../Interfaces/payment';

@Component({
  selector: 'app-pay',
  imports: [RouterModule, ReactiveFormsModule, DebtDetailComponent],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css'
})
export class PayComponent {
  private fb = inject(FormBuilder);
  private route =  inject(ActivatedRoute);
  private paymentService = inject(PaymentService);
  private router = inject(Router);

  debtId!: number;
  form;

  loading = signal(false);
  errorMessage = signal<string | null>(null);
  payment!: PaymentDto;


  constructor() {
    if (!this.debtId) {
      this.debtId = Number(this.route.snapshot.paramMap.get('debtId'));
    }

    this.form = this.fb.group({
      payment_amount: [0, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.errorMessage.set(null);
    
    this.payment = this.form.value as PaymentDto;
    this.payment.debtId = this.debtId;
    this.paymentService.makePayment(this.payment).subscribe({
      next: (res) => {
        if(res){
          this.router.navigate(['/myDebts']);
        }
      }
    });
    
  }
}
