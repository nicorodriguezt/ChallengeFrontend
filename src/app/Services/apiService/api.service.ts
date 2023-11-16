import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  basicUrl = "http://localhost:80"

  constructor(protected  http: HttpClient) { }

  maKeGetRequest(url: string, callback: any, errorCallback: any) {
     return this.http.get(this.basicUrl + url).subscribe({
       next: callback,
       error: errorCallback
     });
  }

  makePostRequest(url: string, body: any, callback: any, errorCallback: any) {
    return this.http.post(this.basicUrl + url, body).subscribe({
      next: callback,
      error: errorCallback
    });
  }
}
