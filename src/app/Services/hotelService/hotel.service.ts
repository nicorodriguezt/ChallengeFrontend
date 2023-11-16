import {computed, Injectable, signal} from '@angular/core';
import {ApiService} from "../apiService/api.service";
import {HttpClient} from "@angular/common/http";
import {HotelModel} from "../../Models/HotelModel"
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HotelService extends ApiService {

  hotelsSignal = signal<HotelModel[]>([]);
  currentPageSignal = signal(1);
  totalPagesSignal = signal(1);
  hotels = computed(() => this.hotelsSignal());
  currentPage= computed(() => this.currentPageSignal());
  totalPages = computed(() => this.totalPagesSignal());
  currentDestination = "";
  currentGuests = "";
  currentCheckin = "";
  currentCheckout = "";

  constructor(http: HttpClient,public router: Router) {
    super(http);
  }

  getHotels(destination: string, checkin: string, checkout: string, guests: string, page: string) {
    this.currentDestination = destination;
    this.currentGuests = guests;
    this.currentCheckin = checkin
    this.currentCheckout = checkout;

    let params =
      `?guests=${guests}&checkin=${checkin}&checkout=${checkout}&destination=${destination}&page=${page}`;

    this.maKeGetRequest("/api/hotel" + params, (res: any) => {
      this.totalPagesSignal.update(()=> res['totalPages'])
      this.currentPageSignal.update(()=> res['currentPage'])
      this.hotelsSignal.update(() => {
        let hotelList = [];
        for(let hotel of res['hotels']) {
          hotelList.push(new HotelModel(hotel))
        }
        return hotelList;
      });
    }, (error: any) => {
      this.router.navigateByUrl('');
      console.log(error)
    })
  }

}
