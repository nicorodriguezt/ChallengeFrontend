import {inject} from '@angular/core';
import {
  HttpRequest, HttpInterceptorFn, HttpHandlerFn, HttpHeaders, HttpEvent, HttpResponse
} from '@angular/common/http';
import {AuthService} from "../Services/authService/auth.service";
import {finalize, tap} from "rxjs";
import {LoadingService} from "../Services/loadingService/loading.service";

export const HttpInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
    HttpHandlerFn) => {
    let loadingService = inject(LoadingService);
    loadingService.setLoadingTrue()
    let userToken = inject(AuthService).getToken();
    let headers = {};
    if (userToken) {
      headers = {...headers, 'Authorization': `Bearer ${userToken}`}
    }
    headers = {...headers, "Access-Control-Allow-Origin": '*'}
    headers = {...headers, "Content-Type":  'application/json'}
    headers = {...headers, "Access-Control-Allow-Credentials":  'true'}
    headers = {...headers, "Access-Control-Allow-Methods":  'POST, GET'}
    const modifiedReq = req.clone({
      headers: new HttpHeaders(headers)
      }
    );
    return next(modifiedReq).pipe(
      finalize(() => {
        loadingService.setLoadingFalse();
      }));
};
