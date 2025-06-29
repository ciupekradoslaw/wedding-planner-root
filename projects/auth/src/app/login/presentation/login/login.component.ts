import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginForm } from '../../domain/model';
import { LoginFacade } from './login-facade.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  standalone: true,
  providers: [LoginFacade],
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly facade = inject(LoginFacade);

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
        next: (response) => console.log('Login success', response.token),
        error: (error) => console.log('Login error', error),
      });
  }
}
