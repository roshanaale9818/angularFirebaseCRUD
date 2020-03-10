import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import Swal from 'sweetalert2';
import{AngularFireAuth} from 'angularfire2/auth'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
email:string ='';
password:string ='';
// isSuccessful:boolean= false;
  constructor(
    private authenticationService:AuthenticationService,
    private angularFireAuth:AngularFireAuth
  ) { }

  ngOnInit() {
  }
  signUp(){
    this.authenticationService.signUpWithEmailAndPassword(this.email,this.password);
    this.email='';
    this.password='';
  }

  goBack(){
    this.authenticationService.goBack();
  }

}
