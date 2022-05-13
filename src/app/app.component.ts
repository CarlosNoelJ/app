import { Router } from '@angular/router';
import { ApiauthService } from './services/apiauth.service';
import { Usuario } from './models/usuario';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  usuario: Usuario;

  constructor(public apiAuthService: ApiauthService,
              private router: Router
              ){
    this.usuario = {email: "", token: ""}
    this.apiAuthService.usuario.subscribe(res => {
      this.usuario = res;
      console.log(`cambio el objecto: ${res} `);
    });
  }

  logout() {
    this.apiAuthService.logout();
    this.router.navigate(['login']);
  }
}
