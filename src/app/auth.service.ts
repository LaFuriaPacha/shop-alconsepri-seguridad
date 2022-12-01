import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireObject } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { GoogleAuthProvider, User } from "firebase/auth";
import { Observable, switchMap, of, from} from 'rxjs';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    this.user$ = afAuth.authState;
   }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithRedirect(new GoogleAuthProvider());

  }

  logout(){
    this.afAuth.signOut();

  }

  get appUser$() : Observable<AppUser> {
    return this.user$.pipe(switchMap((user) => {
        if (user && user.uid) {
          return this.userService.get(user.uid);
        }else{
          return of(null);
        }

    }));



  }
}
