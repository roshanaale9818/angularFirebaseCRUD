import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './../services/authentication.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(
    private authenticationService:AuthenticationService,
    private router:Router
  ){}
  canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
  if(this.authenticationService.isLoggedIn()==true){
    return true;
  }
  else{
    this.router.navigate(['/login']);
    
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Access Denied Please sign in!',
      // footer: '<a href>Why do I have this issue?</a>'
    })
    console.log('Access Denied');
    return false;
  }
  }
  
}
