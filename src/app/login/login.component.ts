import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../Services/http.service';
import { enviroment } from '../../enviroment/enviroment';
import { LoginService } from '../../Services/login.service';
import { Login } from '../../Interfaces/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loading = signal(false);
  message = signal('');
  loginForm;

  constructor(private fb:FormBuilder, private loginService:LoginService, private router: Router){
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
          this.router.navigate(['/myDebts', response.id]);
        },
        error: () => {
          this.loading.set(false);
          this.message.set('Usuario no existe');
        }
      });
    }
  }
}
