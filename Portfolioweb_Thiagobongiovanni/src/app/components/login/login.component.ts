import { Component,  } from '@angular/core';
import { OnInit } from 'node_modules - copia/@angular/core';
import { Router } from 'node_modules - copia/@angular/router';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isLogged = false;
  isLoggininFail = false;
  loginUsuario! : LoginUsuario;
  nombreUsuario! : string;
  password! : string;
  roles : string[] = [];
  errMjs! : string;

  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router){ }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
    this.isLogged =true;
    this.isLoggininFail = false;
    this.roles = this.tokenService.getAuthorities();
  }
}

 onLogin(): void{
  this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password,); 
    this.authService.login(this.loginUsuario).subscribe(data => {
      this.isLogged = true;
      this.isLoggininFail = false;
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      this.router.navigate([''])
    }, err =>{
      this.isLogged = false;
      this.isLoggininFail = true;
      this.errMjs = err.error.mensaje;
      console.log(this.errMjs); 
    })
 }

}
