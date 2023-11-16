import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HotelService} from "../../Services/hotelService/hotel.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hotelSearchComponent',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './hotel-search.component.html',
  styleUrl: './hotel-search.component.scss'
})
export class HotelSearchComponent {

  form: FormGroup = this.formBuilder.group({
    destination: ['', Validators.required],
    checkin: ['', Validators.required],
    checkout: ['', Validators.required],
    guests: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
              private hotelService: HotelService,
              private router: Router) {

  }

  getHotels() {
    this.hotelService.getHotels(
      this.form.value.destination,
      this.form.value.checkin,
      this.form.value.checkout,
      this.form.value.guests,
      '1'
    )
    this.router.navigateByUrl('result')
  }

}
