import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DebtsService } from '../../../Services/debts.service';
import { UsersService } from '../../../Services/users.service';
import { CreateDebt } from '../../../Interfaces/CreateDebt';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../../Services/local-storage.service';

@Component({
  selector: 'app-debt-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './debt-create.component.html',
  styleUrl: './debt-create.component.css'
})
export class DebtCreateComponent {

  private router = inject(Router);
  private localStorageService = inject(LocalStorageService);
  form: FormGroup;
  loading = signal(false);
  errorMessage = signal('');
  debtors = signal<any[]>([]);
  userId = signal("");

  constructor(private fb: FormBuilder, private userService: UsersService, private route: ActivatedRoute, private debtService:DebtsService) {
    this.form = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      debtorId: [null, Validators.required], 
    });
  }

  ngOnInit(): void {
    let userId = this.localStorageService.getItem("userId");
    if(userId){
      this.userId.set(userId) 
      this.loadDebtors();
    }  
    else{
      this.router.navigate(['']);
    }
  }

  loadDebtors() {
    this.userService.GetUsersList().subscribe({
      next: (res) => this.debtors.set(res),
      error: (err) => {
        console.error('Error cargando deudores', err);
        this.errorMessage.set('No se pudieron cargar los deudores.');
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const values = this.form.value as CreateDebt
    values.creditorId = +this.userId();
    this.loading.set(true);
    this.debtService.CreateDebt(values).subscribe({
      next: (res) => {
        if(res){
          this.router.navigate(['/myDebts']);
        }
        
      },
        error: () => {
          this.loading.set(false);
        }
    }); 
  }
}
