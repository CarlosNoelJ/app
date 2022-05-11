import { Usuario } from './../models/usuario';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Response } from '../models/response';
import { map } from 'rxjs/operators';

const httpOption = {
  headers: new HttpHeaders({
    'Content-type':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiauthService{
  url: string = 'https://localhost:44380/api/user/login';

  private usuarioSubject: BehaviorSubject<Usuario>;

  public get usuarioData(): Usuario{
    return this.usuarioSubject.value;
  }

  constructor( private _http: HttpClient){
    this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')!));
  }

  login(email: string, password: string): Observable<Response>{
    return this._http.post<Response>(this.url, {email, password}, httpOption).pipe(
      map(res => {
        if (res.exito === 1){
          const usuario: Usuario = res.data;
          localStorage.setItem('usuario',JSON.stringify(usuario));
          this.usuarioSubject.next(usuario);
        }
        return res;
      })
    );
  }

  logout(){
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null!);
  }
}
