import {Component, computed, OnInit} from '@angular/core';
import {AuthService} from "../../Services/authService/auth.service";
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl} from "@angular/forms";
import { Router } from "@angular/router";
import {AsyncPipe, NgFor} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {debounceTime, map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgFor, MatInputModule, MatAutocompleteModule, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true
})
export class LoginComponent implements  OnInit{
  form: FormGroup = this.formBuilder.group({
    airline: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  filteredOptions: Observable<string[]> | undefined;
  constructor(public authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    authService.getAirlines();
  }

  ngOnInit() {
    this.filteredOptions = this.form.controls['airline'].valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.authService.airlines().filter(option => option.toLowerCase().includes(filterValue));
  }


  login() {
    this.authService.login(this.form.value.username,
      this.form.value.password, this.form.value.airline).subscribe({
      next:(user) => {
        if (!user) {
          alert('Invalid user or password')
        } else {
          this.router.navigateByUrl("")
        }
      }
      })

  }
}
