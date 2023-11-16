import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HotelService} from "../../Services/hotelService/hotel.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";
import {interval, scan, takeWhile, tap} from "rxjs";
import {TimeInterval} from "rxjs/internal/operators/timeInterval";

@Component({
  selector: 'app-hotel-result',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, ReactiveFormsModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './hotel-result.component.html',
  styleUrl: './hotel-result.component.scss'
})
export class HotelResultComponent {


  constructor(public hotelService: HotelService) {
  }

  public goToPreviousPage(element: any) {
    this.hotelService.getHotels(
      this.hotelService.currentDestination,
      this.hotelService.currentCheckin,
      this.hotelService.currentCheckout,
      this.hotelService.currentGuests,
      (this.hotelService.currentPage() - 1).toString()
    )
    this.scrollToTop(element)
  }

  public goToNextPage(element: any) {
    this.hotelService.getHotels(
      this.hotelService.currentDestination,
      this.hotelService.currentCheckin,
      this.hotelService.currentCheckout,
      this.hotelService.currentGuests,
      (this.hotelService.currentPage() + 1).toString()
    )
    this.scrollToTop(element)
  }

  scrollToTop(element: any) {
    const duration = 1000;
    const move = element.scrollTop * 5 / duration;
    interval(5).pipe(
      scan((acc, curr) => acc - move, element.scrollTop),
      tap(position => element.scrollTop = position),
      takeWhile(val => val > 0)).subscribe();
  }

}
