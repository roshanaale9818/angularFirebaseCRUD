import { Injectable, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {auth} from 'firebase';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{

  constructor(
    private angularFireAuth:AngularFireAuth,
    private location:Location,
    private router:Router,
    private ngZone:NgZone
  ) { }

  signInWithGoogleViaPopUp(){
    this.angularFireAuth.auth.signInWithPopup( new auth.GoogleAuthProvider()).then(
      (userCredentials) =>{
        // console.log(userCredentials);
        localStorage.setItem('userRefreshToken',userCredentials.user.refreshToken);
      this.ngZone.run(()=>{
        this.router.navigate(['/home']);
      })


      }
    )


  }
  signUpWithEmailAndPassword(email,password){
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email,password).then((userCredentials)=>{
      console.log(userCredentials);
      // console.log(userCredentials.user.refreshToken);
      Swal.fire(
        'Signed Up',
        ' Successfully!',
        'success'
      )
      console.log('username:',email,'password:',password);


    })

    .catch((error)=>{
      console.log(error);
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('this is error',error);
      var errorCode = error.code;
      var errorMessage = error.message;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      })



    })
  }
  goBack(){
    console.log('backbtn presseed')
    this.location.back();
  }
  signOut(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonText: 'Yes,Log out',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem('userRefreshToken');
        swalWithBootstrapButtons.fire(
          'LoggedOut!',
          'You have logged successfully.',
          'success'
        )
        this.router.navigate(['/login']);
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled'
        )
      }
    })
    
  }
  isLoggedIn(){
    if(localStorage.getItem('userRefreshToken')){
      console.log(localStorage.getItem('user'))
      return true;
  }
  else
  return false;
  }
 }



