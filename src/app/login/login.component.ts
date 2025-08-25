import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { Login } from '../../Interfaces/login';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../Services/local-storage.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);
  private localStorageService = inject(LocalStorageService);

  userIdKey = "userId";

  loading = signal(false);
  message = signal('');
  loginForm;

  constructor(){
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.message.set('');

      const values = this.loginForm.value as Login;

      this.loginService.login(values).subscribe({
        next: (response) => {
          this.localStorageService.setItem(this.userIdKey, response.id)
          this.router.navigate(['/myDebts']);
        },
        error: () => {
          this.loading.set(false);
          this.message.set('Usuario no existe');
        }
      });
    }
  }
}
