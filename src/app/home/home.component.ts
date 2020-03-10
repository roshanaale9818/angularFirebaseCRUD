import { Component, OnInit } from '@angular/core';
import { CrudserviceService } from './../services/crudservice.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { AuthenticationService } from './../services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users:any;
  userName:string;
  userAge:number;
  userAddress:string;
 

  constructor( private crudserviceService:CrudserviceService,
    private location:Location,
    private authenticationService:AuthenticationService) { 

  }

  ngOnInit() {
    this.crudserviceService.readUser().subscribe( data =>{
      this.users = data.map( e=>{
        return { 
          id:e.payload.doc.id,
          isEdit:false,
          Name:e.payload.doc.data()['Name'],
          Age:e.payload.doc.data()['Age'],
          Address:e.payload.doc.data()['Address'],
        } 
      })
      // console.log(this.users);
      // window.location.reload();
      // this.ngOnInit();
    })
   
  }
  createUser(){
   let record = {};
    record['Name'] = this.userName;
    record['Age'] = this.userAge;
    record['Address'] = this.userAddress;
    this.crudserviceService.createUser(record).then(
      resp => {
        this.userName = '',
        this.userAge = undefined,
        this.userAddress = ''
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your data has been added',
          showConfirmButton: false,
          timer: 1500
        })
        // console.log(resp);
       
      }

    )
    .catch(error =>{
      console.log(error);
    })
  }
 
  removeUser(rowID){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.crudserviceService.deleteUser(rowID);
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your file is safe :)',
          'error'
        )
      }
    })
   
  }
  editUser(record){
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditAge = record.Age;
    record.EditAddress = record.Address;
  }

  updateUser(recordRow){
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Age'] = recordRow.EditAge;
    record['Address'] = recordRow.EditAddress;
    this.crudserviceService.updateUser(recordRow.id,record);
    Swal.fire(
      'Data Updated',
      ' Successfully!',
      'success'
    )
    recordRow.isEdit = false;
  }
  logOut(){
    this.authenticationService.signOut();
  }


}
