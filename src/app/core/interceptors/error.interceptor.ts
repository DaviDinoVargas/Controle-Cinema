import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
import { ApiKeyService } from '../services/api-key.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private notify: NotificationService,
    private apiKeys: ApiKeyService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 0:
            this.notify.show('Falha na comunicação com o servidor.', 'error');
            break;

          case 401:
            this.notify.show('Erro 401: Token inválido ou expirado.', 'error');
            this.apiKeys.clear();
            break;

          case 404:
            this.notify.show('Recurso não encontrado.', 'error');
            break;

          case 500:
            this.notify.show('Erro interno do servidor (500).', 'error');
            break;

          default:
            this.notify.show(`Erro inesperado: ${error.status}`, 'error');
            break;
        }

        return throwError(() => error);
      })
    );
  }
}
