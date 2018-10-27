import { OhjausService } from './ohjaus.service';
// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate  {

  constructor(public ohjausService: OhjausService, public router: Router) {}

  canActivate(): boolean {
    console.log('guardissa');

    if (!this.ohjausService.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
  }



