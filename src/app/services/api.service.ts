import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient) { }

  postEmployee(data: any) {
    return this.http.post(`http://localhost:3000/posts`, data)
    .pipe(map((response:any) => {
      return response
    }))
  }

  getEmployee() {
    return this.http.get<any>(`http://localhost:3000/posts`)
    .pipe(map((response: any) => {
      return response
    }))
  }

  updateEmployee(data: any, id:number) {
    return this.http.put<any>(`http://localhost:3000/posts/${id}`,data)
    .pipe(map((response: any) => {
      return response
    }))
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>(`http://localhost:3000/posts/${id}`)
    .pipe(map((response: any) => {
      return response
    }))
  }

}
