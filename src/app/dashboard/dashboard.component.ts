import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  formValue!: FormGroup;
  restaurantModelObj : RestaurantData = new RestaurantData;
  allRestaurantData: any;
  showAdd!:boolean;
  showBtn!:boolean;

  constructor(private formBuilder: FormBuilder, private api:ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      address: [''],
      mobile: [''],
      service: [''],
    });

    this.getAllData();
  }

  clickAddRestaurant(){
    this.formValue.reset();
    this.showAdd= true;
    this.showBtn = false;
  }

  //now subscribing our data

  addRestaurant(){
    this.showAdd = true;
    this.showBtn = false;
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.service = this.formValue.value.service;


    this.api.postRestaurant(this.restaurantModelObj).subscribe((res:any)=>{
      console.log(res);
      alert("Restaurant added successfully!");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();
    },err=>{
      alert("something went wrong!");
    })
  }

  //get all data
  getAllData(){
    this.api.getRestaurant(this.allRestaurantData).subscribe((res:any)=>{
      this.allRestaurantData = res;
    })
  }

  // delete the data

  deleteRestaurant(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res=>{
      alert("Record deleted successfully")
      this.getAllData();
    })
  }

  //edit the data

  editRestaurant(data:any){
    this.showAdd = false;
    this.showBtn = true;
    this.restaurantModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['service'].setValue(data.service);
 
  }

  //update restaurant
  updateRestaurant(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.service = this.formValue.value.service;

    this.api.updateRestaurant(this.restaurantModelObj,this.restaurantModelObj.id).subscribe(res=>{
      alert("Record updated successfully");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();
    })
  }
}
