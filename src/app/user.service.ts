import { Injectable } from '@angular/core';
import { User, user } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private db: AngularFireDatabase ) { }

  save(user: User){
    this.db.object('/users/'+ user.uid).update({
      name: user.displayName,
      email: user.email,
    })
  }

  get(uid:string): Observable<AppUser> {
    return this.db.object<AppUser>('/users/' + uid).valueChanges();
  }
}
