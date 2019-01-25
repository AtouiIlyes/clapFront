import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const currentUser = JSON.parse(localStorage.getItem('currentUserData'));
        const token = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser && token) {
            req = req.clone({
                setHeaders: {
                    Authorization: token
                }
            });
        }

        return next.handle(req);
    }
}
