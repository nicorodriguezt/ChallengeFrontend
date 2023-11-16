import {Routes} from '@angular/router';
import {LoginComponent} from "./Components/loginComponent/login.component";
import {LoginContainerComponent} from "./Components/loginContainer/login-container.component";
import {HotelSearchComponent} from "./Components/hotelSearchComponent/hotel-search.component";
import {HotelResultComponent} from "./Components/hotelResultComponent/hotel-result.component";
import {authGuard} from "./Interceptors/authGuard/auth.guard";

export const routes: Routes = [
  { path:'', component: HotelSearchComponent, canActivate: [authGuard]},
  { path:'result', component: HotelResultComponent, canActivate: [authGuard]},
  { path:'login', component: LoginContainerComponent,
    children: [
      { path: '', component: LoginComponent }
    ]
  }
];
