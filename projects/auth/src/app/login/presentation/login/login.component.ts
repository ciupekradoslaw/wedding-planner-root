import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from '../../domain/model';
import { LoginFacade } from './login-facade.service';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  standalone: true,
  providers: [LoginFacade],
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly facade = inject(LoginFacade);

  loginValid: boolean = true;

  readonly loginForm = this.formBuilder.group<LoginForm>({
    username: this.formBuilder.nonNullable.control('', [Validators.required]),
    password: this.formBuilder.nonNullable.control('', [Validators.required]),
  });

  onSubmit(): void {
    const formValue = this.loginForm.getRawValue();

    if (
      this.loginForm.invalid ||
      formValue.username === null ||
      formValue.password === null
    )
      return;

    this.facade
      .login({ username: formValue.username, password: formValue.password })
      .subscribe({
        next: (response) => {
          this.loginValid = false;
          console.log('Login success', response.token);
        },
        error: (error) => {
          this.loginValid = false;
          console.log('Login error', error);
        },
      });
  }
}
