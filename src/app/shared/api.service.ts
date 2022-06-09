import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }
  //api's
  // create restaurant using POST method

  postRestaurant(data:any){
    return this._http.post<any>("http://localhost:3000/posts/",data).pipe(map((res:any)=>{
        return res;
    }))
  }

  //get restaurant

  getRestaurant(data:any){
    return this._http.get<any>("http://localhost:3000/posts/",data).pipe(map((res:any)=>{
      return res;
    }))
  }

  //update restaurant

  updateRestaurant(data:any, id:number){
    return this._http.put<any>("http://localhost:3000/posts/",+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }

  //delete restaurant

  deleteRestaurant(id:number){
    return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
}
