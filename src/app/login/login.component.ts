import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { AngularFireAuth } from 'angularfire2/auth';
import Swal from 'sweetalert2';


// import { ngxLoadingAnimationTypes,NgxLoadingComponent } from 'ngx-loading';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email:string;
password:string;
public loading:boolean = false;
// public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  constructor(private authenticationService:AuthenticationService,
    private angularFireAuth:AngularFireAuth,
    private router:Router

    ) { }

  ngOnInit() {
  }
  signIn(){
    this.loading = true;
    console.log(this.email,this.password);
    // this.authenticationService.signInWithEmailAndPassword(this.email,this.password);
    this.angularFireAuth.auth.signInWithEmailAndPassword(this.email,this.password).then(
      (userCredentials)=>{
        this.loading = false;
        // console.log('signed Successfully',userCredentials);
        // console.log(signed);
        localStorage.setItem('userRefreshToken',userCredentials.user.refreshToken);
        this.router.navigate(['/home']);
        
        
      }
    ).catch((error)=>{
      console.log('this is error',error);
      var errorCode = error.code;
      var errorMessage = error.message;
      // alert(errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      })
      this.loading = false;

    })
  }

  googleSignIn(){
    this.authenticationService.signInWithGoogleViaPopUp();
  }

}
