import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../Services/authService/auth.service";
import {HotelService} from "../../Services/hotelService/hotel.service";
import {LoadingService} from "../../Services/loadingService/loading.service";

export const authGuard: CanActivateFn = (route, state) => {
  let session = inject(AuthService).session;
  if (session) {
    let currentUrl = route.url.length == 0 ? '' : route.url[0].path;
    if (currentUrl != 'result' || inject(HotelService).hotels().length != 0 || inject(LoadingService).isLoading()) {
      return true
    }
    inject(Router).navigateByUrl('')
  } else {
    inject(Router).navigateByUrl('login')
  }
  return false;
};
