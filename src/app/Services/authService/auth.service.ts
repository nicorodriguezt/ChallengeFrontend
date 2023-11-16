import {computed, Injectable, signal} from '@angular/core';
import {ApiService} from "../apiService/api.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  session: any;

  airlinesSignal = signal<string[]>([]);

  public airlines = computed(this.airlinesSignal)

  constructor(http: HttpClient) {
    super(http);
    let session = localStorage.getItem('session');
    if (session) session = JSON.parse(session);
    this.session = session;
  }

  getAirlines() {
    if(this.airlines().length === 0) {
      this.maKeGetRequest("/api/airline", (res: any) => {
       this.airlinesSignal.update(() => {
         return res;
       });
      }, (error: any) => {
        console.log(error)
      })
    }
  }

  login(username: string, password: string, airline: string) {
    return new Observable(observer => {
      let body = {
        airline: airline,
        username: username,
        password: password
      }

      this.makePostRequest("/api/login", body, (res: any) => {
        if (res) {
          this.session = res;
          localStorage.setItem("session", JSON.stringify(this.session));
          observer.next(this.session);
        }
      }, (error: any) => {
        alert("Invalid Credentials")
        console.log(error)
      })
    });
  }

  logout() {
    this.session = null;
    localStorage.clear();
  }

  getToken(): string {
    if(this.session) {
      return this.session.token;
    }
    return '';
  }
}
