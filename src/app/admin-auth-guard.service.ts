import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { map, switchMap } from 'rxjs';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService ) { }

  canActivate(): Observable <boolean> {

    return this.auth.appUser$.pipe(
     map(user => user.isAdmin));
  }

}
