import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet, IonButton } from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';
import { Router } from '@angular/router';
import { UsersService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonButton, IonApp, IonRouterOutlet],
})
export class AppComponent {
  public router: Router = inject(Router);
  public auth: UsersService = inject(UsersService);

  constructor() {
    this.router.navigateByUrl('splash');
  }
  ionViewDitEnter() {
    SplashScreen.hide();
  }

  async cerrarSesion() {
    await this.auth.cerrarSesion();
    this.router.navigateByUrl('/login');
  }
}
