import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from 'src/app/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private ajax: Http
  ) { }
}
