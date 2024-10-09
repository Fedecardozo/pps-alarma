import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  public router: Router = inject(Router);

  constructor() {
    this.router.navigateByUrl('splash');
  }
  ionViewDitEnter() {
    SplashScreen.hide();
  }
}
