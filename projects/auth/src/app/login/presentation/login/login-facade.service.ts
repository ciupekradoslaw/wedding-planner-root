import { inject, Injectable } from '@angular/core';
import { LoginService } from '../../application/login.service';
import { LoginRequest, LoginResponse } from '../../domain/model';
import { Observable } from 'rxjs';

@Injectable()
export class LoginFacade {
  // TODO - use NgRx store
  private readonly loginService = inject(LoginService);

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.loginService.login(request);
  }
}
